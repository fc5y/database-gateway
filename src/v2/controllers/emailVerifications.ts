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
    const has_total = req.body?.has_total || false;

    await knex.transaction(async (trx) => {
      const query = trx('EmailVerifications');
      if (where.constructor === Object) {
        query.where(where);
      } else {
        for (const value of where) {
          if (Array.isArray(value)) {
            query.where(value[0], value[1], value[2]);
          } else {
            query.whereRaw(value, []);
          }
        }
      }

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
