import { body } from 'express-validator';
import { validationMiddleware } from './common';

const createUser = [body('values').isObject(), validationMiddleware];

const readUser = [
  body('offset').isInt({ min: 0 }),
  body('limit').isInt({ min: 0 }),
  body('where').isObject().optional(),
  body('order_by').isArray().optional(),
  body('order_by.*').isString(),
  body('has_total').isBoolean().optional(),
  validationMiddleware,
];

const updateUser = [body('where').isObject(), body('values').isObject(), validationMiddleware];

const deleteUser = [body('where').isObject(), validationMiddleware];

export default {
  createUser,
  readUser,
  updateUser,
  deleteUser,
};
