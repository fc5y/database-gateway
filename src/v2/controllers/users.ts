import { Request, Response, NextFunction } from 'express';
import { applyWhere } from './common';
import { assertWithSchema } from '../validation';
import {
  createUserParamsSchema,
  readUserParamsSchema,
  updateUserParamsSchema,
  deleteUserParamsSchema,
} from '../schemas/users';
import knex from '../../db';

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
      const query = applyWhere(trx('Users'), where);
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
    const query = applyWhere(knex('Users'), where);
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
    const query = applyWhere(knex('Users'), where);
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
