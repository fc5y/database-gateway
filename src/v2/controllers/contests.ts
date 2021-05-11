import { Request, Response, NextFunction } from 'express';
import { RequestBodySchema } from '../schemas';
import knex from '../../db';

const createContest = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { values } = req.body as RequestBodySchema;
    await knex('Contests').insert(values);

    res.json({
      error: 0,
    });
  } catch (err) {
    next(err);
  }
};

const readContest = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { offset, limit } = req.body as RequestBodySchema;
    const where = req.body?.where || {};

    await knex.transaction(async (trx) => {
      const query = trx('Contests').where(where);
      const total = await query.clone().count('*', { as: 'count' }).first();
      const items = await query.clone().select('*').offset(offset).limit(limit);

      res.json({
        error: 0,
        data: {
          total: total?.count,
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
