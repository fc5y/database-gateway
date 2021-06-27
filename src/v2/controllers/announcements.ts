import { Request, Response, NextFunction } from 'express';
import { ERROR_CODE, GeneralError } from '../errors';
import { assertWithSchema } from '../validation';
import {
  createAnnouncementParamsSchema,
  readAnnouncementParamsSchema,
  updateAnnouncementParamsSchema,
  deleteAnnouncementParamsSchema,
} from '../schemas/announcements';
import knex from '../../db';

const makeWhereQuery = (trx: any, where: Record<string, unknown> | Array<string | [any, any, any]>) => {
  const query = trx('Announcements');
  if (Array.isArray(where)) {
    for (const value of where) {
      if (typeof value === 'string') {
        query.whereRaw(value, []);
      } else if (Array.isArray(value) && value.length === 3) {
        query.where(value[0], value[1], value[2]);
      } else {
        throw new GeneralError({
          error: ERROR_CODE.BAD_WHERE_CLAUSE,
          error_msg: "where's elements must be a string or an array of length 3",
          data: null,
        });
      }
    }
  } else if (typeof where === 'object' && where !== null) {
    query.where(where);
  } else {
    throw new GeneralError({
      error: ERROR_CODE.BAD_WHERE_CLAUSE,
      error_msg: 'where must be an array or an object',
      data: null,
    });
  }

  return query;
};

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
      const query = makeWhereQuery(trx, where);
      const items = await query.clone().select('*').offset(offset).limit(limit).orderBy(order_by);
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
    const query = makeWhereQuery(knex, where);
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
    const query = makeWhereQuery(knex, where);
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
