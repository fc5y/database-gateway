import { Request, Response, NextFunction } from 'express';
import { ERROR_CODE, GeneralError } from '../errors';
import { assertWithSchema } from '../validation';
import {
  createUserParamsSchema,
  readUserParamsSchema,
  updateUserParamsSchema,
  deleteUserParamsSchema,
} from '../schemas/users';
import knex from '../../db';

const makeWhereQuery = (trx: any, where: Record<string, unknown> | Array<string | [any, any, any]>) => {
  const query = trx('Users');
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

const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { values } = assertWithSchema(req.body, createUserParamsSchema);
    await knex('Users').insert(values);

    res.json({
      error: 0,
      error_msg: 'User created',
    });
  } catch (err) {
    next(err);
  }
};

const readUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const {
      offset,
      limit,
      where = {},
      order_by = [],
      has_total = false,
    } = assertWithSchema(req.body, readUserParamsSchema);

    await knex.transaction(async (trx) => {
      const query = makeWhereQuery(trx, where);
      const items = await query.clone().select('*').offset(offset).limit(limit).orderBy(order_by);
      const total = has_total ? (await query.clone().count('*', { as: 'count' }).first())?.count : undefined;

      res.json({
        error: 0,
        error_msg: req.method === 'GET' ? 'GET is unsafe, use POST instead' : 'Users',
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
    const { where, values } = assertWithSchema(req.body, updateUserParamsSchema);
    const query = makeWhereQuery(knex, where);
    await query.update(values);

    res.json({
      error: 0,
      error_msg: 'User updated',
    });
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { where } = assertWithSchema(req.body, deleteUserParamsSchema);
    const query = makeWhereQuery(knex, where);
    await query.del();

    res.json({
      error: 0,
      error_msg: 'User deleted',
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
