import { Request, Response, NextFunction } from 'express';
import { applyWhere, applyOrderBy } from './common';
import { assertWithSchema } from '../validation';
import {
  createAnnouncementParamsSchema,
  readAnnouncementParamsSchema,
  updateAnnouncementParamsSchema,
  deleteAnnouncementParamsSchema,
} from '../schemas/announcements';
import knex from '../../db';

const createAnnouncement = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { values } = assertWithSchema(req.body, createAnnouncementParamsSchema);
    await knex('Announcements').insert(values);

    res.json({
      error: 0,
      error_msg: 'Announcement created',
    });
  } catch (err) {
    next(err);
  }
};

const readAnnouncement = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const {
      offset,
      limit,
      where = {},
      order_by = [],
      has_total = false,
    } = assertWithSchema(req.body, readAnnouncementParamsSchema);

    await knex.transaction(async (trx) => {
      const query = applyWhere(trx('Announcements'), where);
      const items = await applyOrderBy(query.clone().select('*').offset(offset).limit(limit), order_by);
      const total = has_total ? (await query.clone().count('*', { as: 'count' }).first())?.count : undefined;

      res.json({
        error: 0,
        error_msg: req.method === 'GET' ? 'GET is unsafe, use POST instead' : 'Announcements',
        data: {
          total: total,
          items,
        },
      });
    });
  } catch (err) {
    next(err);
  }
};

const updateAnnouncement = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { where, values } = assertWithSchema(req.body, updateAnnouncementParamsSchema);
    const query = applyWhere(knex('Announcements'), where);
    await query.update(values);

    res.json({
      error: 0,
      error_msg: 'Announcement updated',
    });
  } catch (err) {
    next(err);
  }
};

const deleteAnnouncement = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { where } = assertWithSchema(req.body, deleteAnnouncementParamsSchema);
    const query = applyWhere(knex('Announcements'), where);
    await query.del();

    res.json({
      error: 0,
      error_msg: 'Announcement deleted',
    });
  } catch (err) {
    next(err);
  }
};

export default {
  createAnnouncement,
  readAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
};
