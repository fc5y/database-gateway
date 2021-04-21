import { body } from 'express-validator';
import { isArrayOfObjects, validationMiddleware } from './common';

const createParticipation = [body('values').isArray(), validationMiddleware];

const readParticipation = [
  body('offset').isInt({ min: 0 }),
  body('limit').isInt({ min: 0 }),
  body('where').isObject().optional(),
  validationMiddleware
];

const updateParticipation = [
  body('where').isObject(),
  body('values').custom(isArrayOfObjects),
  validationMiddleware
];

const deleteParticipation = [body('where').isObject(), validationMiddleware];

export default {
  createParticipation,
  readParticipation,
  updateParticipation,
  deleteParticipation
};
