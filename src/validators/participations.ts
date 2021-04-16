import { body, param, query } from 'express-validator';
import { validationMiddleware } from './common';

const createParticipation = [body('values').isArray(), validationMiddleware];

const readParticipation = [
  body('offset').isInt({ min: 0 }),
  body('limit').isInt({ min: 0 }),
  body('where').isArray().optional(),
  validationMiddleware
];

const updateParticipation = [validationMiddleware];

const deleteParticipation = [body('where').isArray(), validationMiddleware];

export default {
  createParticipation,
  readParticipation,
  updateParticipation,
  deleteParticipation
};
