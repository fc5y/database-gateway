import { Request, Response, NextFunction } from 'express';
import { applyWhere, applyOrderBy } from './common';
import { assertWithSchema } from '../validation';
import {
  createParticipationParamsSchema,
  readParticipationParamsSchema,
  updateParticipationParamsSchema,
  deleteParticipationParamsSchema,
} from '../schemas/participations';
import knex from '../../db';

const createParticipation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { values } = assertWithSchema(req.body, createParticipationParamsSchema);
    await knex('Participations').insert(values);

    res.json({
      error: 0,
      error_msg: 'Participation created',
    });
  } catch (err) {
    next(err);
  }
};

const readParticipation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const {
      offset,
      limit,
      where = {},
      order_by = [],
      has_total = false,
    } = assertWithSchema(req.body, readParticipationParamsSchema);

    await knex.transaction(async (trx) => {
      const query = applyWhere(trx('Participations'), where);
      const items = await applyOrderBy(query.clone().select('*').offset(offset).limit(limit), order_by);
      const total = has_total ? (await query.clone().count('*', { as: 'count' }).first())?.count : undefined;

      res.json({
        error: 0,
        error_msg: req.method === 'GET' ? 'GET is unsafe, use POST instead' : 'Participations',
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

const updateParticipation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { where, values } = assertWithSchema(req.body, updateParticipationParamsSchema);
    const query = applyWhere(knex('Participations'), where);
    await query.update(values);

    res.json({
      error: 0,
      error_msg: 'Participation updated',
    });
  } catch (err) {
    next(err);
  }
};

const deleteParticipation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { where } = assertWithSchema(req.body, deleteParticipationParamsSchema);
    const query = applyWhere(knex('Participations'), where);
    await query.del();

    res.json({
      error: 0,
      error_msg: 'Participation deleted',
    });
  } catch (err) {
    next(err);
  }
};

export default {
  createParticipation,
  readParticipation,
  updateParticipation,
  deleteParticipation,
};
