import { Request, Response, NextFunction } from 'express';
import { RequestBodySchema } from '../schemas';
import knex from '../../db';

const createEmailVerification = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { values } = req.body as RequestBodySchema;
    await knex('EmailVerifications').insert(values);

    res.json({
      error: 0,
    });
  } catch (err) {
    next(err);
  }
};

const readEmailVerification = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { offset, limit } = req.body as RequestBodySchema;
    const where = req.body?.where || {};
    const values = await knex('EmailVerifications').select('*').where(where).offset(offset).limit(limit);
    const total = await knex('EmailVerifications').count('*');

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

const updateEmailVerification = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { where, values } = req.body as RequestBodySchema;
    await knex('EmailVerifications').where(where).update(values);

    res.json({
      error: 0,
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
