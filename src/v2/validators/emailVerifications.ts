import { body } from 'express-validator';
import { validationMiddleware } from './common';

const createEmailVerification = [body('values').isObject(), validationMiddleware];

const readEmailVerification = [
  body('offset').isInt({ min: 0 }),
  body('limit').isInt({ min: 0 }),
  body('where').isObject().optional(),
  body('order_by').isArray().optional(),
  body('order_by.*').isString(),
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
