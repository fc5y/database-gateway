import { Request, Response, NextFunction } from 'express';
import { applyWhere } from './common';
import { assertWithSchema } from '../validation';
import {
  createContestParamsSchema,
  readContestParamsSchema,
  updateContestParamsSchema,
  deleteContestParamsSchema,
} from '../schemas/contests';
import knex from '../../db';
import { timestampToDate } from '../../utils';

const createContest = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { values } = assertWithSchema(req.body, createContestParamsSchema);
    const { start_time } = values;
    await knex('Contests').insert({
      ...values,
      start_time: start_time != null ? timestampToDate(start_time) : undefined,
    });

    res.json({
      error: 0,
      error_msg: 'Contest created',
    });
  } catch (err) {
    next(err);
  }
};

const readContest = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const {
      offset,
      limit,
      where = {},
      order_by = [],
      has_total = false,
    } = assertWithSchema(req.body, readContestParamsSchema);

    await knex.transaction(async (trx) => {
      const query = applyWhere(trx('Contests'), where);
      const items = await query.clone().select('*').offset(offset).limit(limit).orderBy(order_by);
      const total = has_total ? (await query.clone().count('*', { as: 'count' }).first())?.count : undefined;

      res.json({
        error: 0,
        error_msg: req.method === 'GET' ? 'GET is unsafe, use POST instead' : 'Contests',
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

const updateContest = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { where, values } = assertWithSchema(req.body, updateContestParamsSchema);
    const { start_time } = values;
    const query = applyWhere(knex('Contests'), where);
    await query.update({
      ...values,
      start_time: start_time != null ? timestampToDate(start_time) : undefined,
    });

    res.json({
      error: 0,
      error_msg: 'Contest updated',
    });
  } catch (err) {
    next(err);
  }
};

const deleteContest = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { where } = assertWithSchema(req.body, deleteContestParamsSchema);
    const query = applyWhere(knex('Contests'), where);
    await query.del();

    res.json({
      error: 0,
      error_msg: 'Contest deleted',
    });
  } catch (err) {
    next(err);
  }
};

export default {
  createContest,
  readContest,
  updateContest,
  deleteContest,
};
