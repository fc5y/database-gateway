import { body, param, query } from 'express-validator';
import { validationMiddleware } from './common';

const createParticipation = [body('values').isArray(), validationMiddleware];

const readParticipation = [
  body('offset').isInt({ min: 0 }),
  body('limit').isInt({ min: 0 }),
  body('where').isObject(),
  validationMiddleware
];

const updateParticipation = [
  body('where').isObject(),
  body('values').isArray(),
  validationMiddleware
];

const deleteParticipation = [body('where').isObject(), validationMiddleware];

export default {
  createParticipation,
  readParticipation,
  updateParticipation,
  deleteParticipation
};
