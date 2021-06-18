import { Request, Response, NextFunction } from 'express';
import { RequestBodySchema } from '../schemas';
import knex from '../../db';

const createContest = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { values } = req.body as RequestBodySchema;
    await knex('Contests').insert(values);

    res.json({
      error: 0,
      error_msg: '',
    });
  } catch (err) {
    next(err);
  }
};

const readContest = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { offset, limit } = req.body as RequestBodySchema;
    const where = req.body?.where || {};
    const order_by = req.body?.order_by || [];
    const has_total = req.body?.has_total || false;

    await knex.transaction(async (trx) => {
      const query = trx('Contests').where(where);
      const items = await query.clone().select('*').offset(offset).limit(limit).orderBy(order_by, 'asc');
      const total = has_total ? (await query.clone().count('*', { as: 'count' }).first())?.count : undefined;

      res.json({
        error: 0,
        error_msg: '',
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
    const { where, values } = req.body as RequestBodySchema;
    await knex('Contests').where(where).update(values);

    res.json({
      error: 0,
      error_msg: '',
    });
  } catch (err) {
    next(err);
  }
};

const deleteContest = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { where } = req.body as RequestBodySchema;
    await knex('Contests').where(where).del();

    res.json({
      error: 0,
      error_msg: '',
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
