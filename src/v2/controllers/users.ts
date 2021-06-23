import { Request, Response, NextFunction } from 'express';
import { RequestBodySchema } from '../schemas';
import { ERRORS, LogicError } from '../errors';
import knex from '../../db';

const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { values } = req.body as RequestBodySchema;
    await knex('Users').insert(values);

    res.json({
      error: 0,
      error_msg: '',
    });
  } catch (err) {
    next(err);
  }
};

const readUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { offset, limit, where = {}, order_by = [], has_total = false } = req.body as RequestBodySchema;

    await knex.transaction(async (trx) => {
      const query = trx('Users');
      if (Array.isArray(where)) {
        for (const value of where) {
          if (typeof value === 'string') {
            query.whereRaw(value, []);
          } else if (Array.isArray(value) && value.length === 3) {
            query.where(value[0], value[1], value[2]);
          } else {
            throw new LogicError({ ...ERRORS.BAD_REQUEST });
          }
        }
      } else if (typeof where === 'object' && where !== null) {
        query.where(where);
      } else {
        throw new LogicError({ ...ERRORS.BAD_REQUEST });
      }

      const items = await query.clone().select('*').offset(offset).limit(limit).orderBy(order_by);
      const total = has_total ? (await query.clone().count('*', { as: 'count' }).first())?.count : undefined;

      res.json({
        error: 0,
        error_msg: req.method === 'GET' ? 'GET is unsafe, use POST instead' : '',
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

const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { where, values } = req.body as RequestBodySchema;
    await knex('Users').where(where).update(values);

    res.json({
      error: 0,
      error_msg: '',
    });
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { where } = req.body as RequestBodySchema;
    await knex('Users').where(where).del();

    res.json({
      error: 0,
      error_msg: '',
    });
  } catch (err) {
    next(err);
  }
};

export default {
  createUser,
  readUser,
  updateUser,
  deleteUser,
};
