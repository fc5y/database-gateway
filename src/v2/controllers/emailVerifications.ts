import { Request, Response, NextFunction } from 'express';
import { ERROR_CODE, GeneralError } from '../errors';
import { assertWithSchema } from '../validation';
import {
  createEmailVerificationParamsSchema,
  readEmailVerificationParamsSchema,
  updateEmailVerificationParamsSchema,
  deleteEmailVerificationParamsSchema,
} from '../schemas/emailVerifications';
import knex from '../../db';
import { timestampToDate } from '../../utils';

const makeWhereQuery = (trx: any, where: Record<string, unknown> | Array<string | [any, any, any]>) => {
  const query = trx('EmailVerifications');
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
      const query = makeWhereQuery(trx, where);
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
    const query = makeWhereQuery(knex, where);
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
    const query = makeWhereQuery(knex, where);
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
