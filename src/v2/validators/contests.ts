import { body } from 'express-validator';
import { validationMiddleware } from './common';

const createContest = [body('values').isObject(), validationMiddleware];

const readContest = [
  body('offset').isInt({ min: 0 }),
  body('limit').isInt({ min: 0 }),
  body('where').isObject().optional(),
  body('order_by').isArray().optional(),
  body('order_by.*').isString(),
  body('has_total').isBoolean().optional(),
  validationMiddleware,
];

const updateContest = [body('where').isObject(), body('values').isObject(), validationMiddleware];

const deleteContest = [body('where').isObject(), validationMiddleware];

export default {
  createContest,
  readContest,
  updateContest,
  deleteContest,
};
