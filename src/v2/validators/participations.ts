import { body } from 'express-validator';
import { validationMiddleware } from './common';

const createParticipation = [body('values').isObject(), validationMiddleware];

const readParticipation = [
  body('offset').isInt({ min: 0 }),
  body('limit').isInt({ min: 0 }),
  body('where').isObject().optional(),
  body('order_by').isArray().optional(),
  body('order_by.*').isString(),
  validationMiddleware,
];

const updateParticipation = [body('where').isObject(), body('values').isObject(), validationMiddleware];

const deleteParticipation = [body('where').isObject(), validationMiddleware];

export default {
  createParticipation,
  readParticipation,
  updateParticipation,
  deleteParticipation,
};
