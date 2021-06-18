import { Request, Response, NextFunction } from 'express';
import { RequestBodySchema } from '../schemas';
import knex from '../../db';

const createEmailVerification = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { values } = req.body as RequestBodySchema;
    await knex('EmailVerifications').insert(values);

    res.json({
      error: 0,
      error_msg: '',
    });
  } catch (err) {
    next(err);
  }
};

const readEmailVerification = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { offset, limit } = req.body as RequestBodySchema;
    const where = req.body?.where || {};
    const order_by = req.body?.order_by || [];

    await knex.transaction(async (trx) => {
      const query = trx('EmailVerifications').where(where);
      const total = await query.clone().count('*', { as: 'count' }).first();
      const items = await query.clone().select('*').offset(offset).limit(limit).orderBy(order_by, 'asc');

      res.json({
        error: 0,
        error_msg: '',
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

const updateEmailVerification = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { where, values } = req.body as RequestBodySchema;
    await knex('EmailVerifications').where(where).update(values);

    res.json({
      error: 0,
      error_msg: '',
    });
  } catch (err) {
    next(err);
  }
};

const deleteEmailVerification = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { where } = req.body as RequestBodySchema;
    await knex('EmailVerifications').where(where).del();

    res.json({
      error: 0,
      error_msg: '',
    });
  } catch (err) {
    next(err);
  }
};

export default {
  createEmailVerification,
  readEmailVerification,
  updateEmailVerification,
  deleteEmailVerification,
};
