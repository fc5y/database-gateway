import express from 'express';

import knex from '../db';
import * as utils from '../utils';
import { ERRORS, LogicError } from './errors';

import parseQueryString from './middlewares/parseQueryString';
import participationsValidator from './validators/participations';
import participationsController from './controllers/participations';

import usersController from './controllers/users';
import usersValidators from './validators/users';

import contestsValidator from "./validators/contests";
import contestsController from "./controllers/contests";

const router = express.Router();

router.get('/timestamp', (req: express.Request, res: express.Response) => {
  res.json({
    data: { timestamp: utils.getCurrentTimestamp() },
    error: 0,
    error_msg: ''
  });
});

router.get('/contests', (req: express.Request, res: express.Response) => {
  knex
    .select('*')
    .from('Contests')
    .then((rows) => {
      res.json(rows);
    });
});

// Participations
router.post(
  '/participations/create',
  participationsValidator.createParticipation,
  participationsController.createParticipation
);
router.post(
  '/participations/read',
  participationsValidator.readParticipation,
  participationsController.readParticipation
);
router.post(
  '/participations/update',
  participationsValidator.updateParticipation,
  participationsController.updateParticipation
);
router.post(
  '/participations/delete',
  participationsValidator.deleteParticipation,
  participationsController.deleteParticipation
);
router.get(
  '/participations',
  parseQueryString,
  participationsValidator.readParticipation,
  participationsController.readParticipation
);

//Users
router.post('/users/create', usersValidators.createUser, usersController.createUser)
router.post('/users/read', usersValidators.readUser, usersController.readUser)
router.post('/users/update', usersValidators.updateUser, usersController.updateUser)
router.post('/users/delete', usersValidators.deleteUser, usersController.deleteUser)
router.get('/users', parseQueryString, usersValidators.readUser, usersController.readUser)

// Contests
router.post(
  '/contests/create',
  contestsValidator.createContest,
  contestsController.createContest
);
router.post(
  '/contests/read',
  contestsValidator.readContest,
  contestsController.readContest
)
router.post(
  '/contests/delete',
  contestsValidator.deleteContest,
  contestsController.deleteContest
)
router.post(
  '/contest/update',
  contestsValidator.updateContest,
  contestsController.updateContest
)
router.get(
  '/contests',
  parseQueryString,
  contestsValidator.readContest,
  contestsController.readContest
)

router.use(
  (
    error: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(error);
    if (error instanceof LogicError) {
      res.status(400).json(error);
    } else {
      res.status(500).json({
        ...ERRORS.SERVER_ERROR
      });
    }
  }
);

export default router;
