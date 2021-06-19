import { body, oneOf } from 'express-validator';
import { validationMiddleware, isWhereClause } from './common';

const createEmailVerification = [body('values').isObject(), validationMiddleware];

const readEmailVerification = [
  body('offset').isInt({ min: 0 }),
  body('limit').isInt({ min: 0 }),
  oneOf([body('where').isObject().optional(), [body('where').isArray(), body('where.*').custom(isWhereClause)]]),
  body('order_by').isArray().optional(),
  body('order_by.*').isString(),
  body('has_total').isBoolean().optional(),
  validationMiddleware,
];

const updateEmailVerification = [body('where').isObject(), body('values').isObject(), validationMiddleware];

const deleteEmailVerification = [body('where').isObject(), validationMiddleware];

export default {
  createEmailVerification,
  readEmailVerification,
  updateEmailVerification,
  deleteEmailVerification,
};
