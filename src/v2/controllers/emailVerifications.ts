import { Request, Response, NextFunction } from 'express';
import { applyWhere } from './common';
import { assertWithSchema } from '../validation';
import {
  createEmailVerificationParamsSchema,
  readEmailVerificationParamsSchema,
  updateEmailVerificationParamsSchema,
  deleteEmailVerificationParamsSchema,
} from '../schemas/emailVerifications';
import knex from '../../db';
import { timestampToDate } from '../../utils';

const createEmailVerification = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { values } = assertWithSchema(req.body, createEmailVerificationParamsSchema);
    const { expired_time } = values;
    await knex('EmailVerifications').insert({
      ...values,
      expired_time: expired_time != null ? timestampToDate(expired_time) : undefined,
    });

    res.json({
      error: 0,
      error_msg: 'EmailVerification created',
    });
  } catch (err) {
    next(err);
  }
};

const readEmailVerification = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const {
      offset,
      limit,
      where = {},
      order_by = [],
      has_total = false,
    } = assertWithSchema(req.body, readEmailVerificationParamsSchema);

    await knex.transaction(async (trx) => {
      const query = applyWhere(trx('EmailVerifications'), where);
      const items = await query.clone().select('*').offset(offset).limit(limit).orderBy(order_by);
      const total = has_total ? (await query.clone().count('*', { as: 'count' }).first())?.count : undefined;

      res.json({
        error: 0,
        error_msg: req.method === 'GET' ? 'GET is unsafe, use POST instead' : 'EmailVerifications',
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
    const { where, values } = assertWithSchema(req.body, updateEmailVerificationParamsSchema);
    const { expired_time } = values;
    const query = applyWhere(knex('EmailVerifications'), where);
    await query.update({
      ...values,
      expired_time: expired_time != null ? timestampToDate(expired_time) : undefined,
    });

    res.json({
      error: 0,
      error_msg: 'EmailVerification updated',
    });
  } catch (err) {
    next(err);
  }
};

const deleteEmailVerification = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { where } = assertWithSchema(req.body, deleteEmailVerificationParamsSchema);
    const query = applyWhere(knex('EmailVerifications'), where);
    await query.del();

    res.json({
      error: 0,
      error_msg: 'EmailVerification deleted',
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
