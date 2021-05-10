import { Request, Response, NextFunction } from 'express';
import { RequestBodySchema } from '../schemas';
import knex from '../../db';

const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { values } = req.body as RequestBodySchema;
    await knex('Users').insert(values);

    res.json({
      error: 0,
    });
  } catch (err) {
    next(err);
  }
};

const readUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { offset, limit } = req.body as RequestBodySchema;
    const where = req.body?.where || {};
    const values = await knex('Users').select('*').where(where).offset(offset).limit(limit);
    const total = await knex('Users').count('*');

    res.json({
      error: 0,
      data: {
        total: total[0]['count(*)'],
        values,
      },
    });
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { where, values } = req.body as RequestBodySchema;
    await knex('User').where(where).update(values);

    res.json({
      error: 0,
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
