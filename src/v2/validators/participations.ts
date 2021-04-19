import { body } from 'express-validator';
import {
  isArrayOfObjects,
  createFieldsValidator,
  validationMiddleware
} from './common';

const createParticipation = [
  body('values').isArray(),
  body().custom(createFieldsValidator(['values'])),
  validationMiddleware
];

const readParticipation = [
  body('offset').isInt({ min: 0 }),
  body('limit').isInt({ min: 0 }),
  body('where').isObject().optional(),
  body().custom(createFieldsValidator(['offset', 'limit', 'where'])),
  validationMiddleware
];

const updateParticipation = [
  body('where').isObject(),
  body('values').custom(isArrayOfObjects),
  body().custom(createFieldsValidator(['where', 'values'])),
  validationMiddleware
];

const deleteParticipation = [
  body('where').isObject(),
  body().custom(createFieldsValidator(['where'])),
  validationMiddleware
];

export default {
  createParticipation,
  readParticipation,
  updateParticipation,
  deleteParticipation
};
