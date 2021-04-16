import { body, param, query } from 'express-validator';
import { validationMiddleware } from './common';

const createParticipation = [validationMiddleware];

const readParticipation = [validationMiddleware];

const updateParticipation = [validationMiddleware];

const deleteParticipation = [validationMiddleware];

export default {
  createParticipation,
  readParticipation,
  updateParticipation,
  deleteParticipation
};
