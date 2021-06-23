import express from 'express';

import * as utils from '../utils';
import { ERRORS, LogicError } from './errors';

import parseQueryString from './middlewares/parseQueryString';
import participationsValidator from './validators/participations';
import participationsController from './controllers/participations';

import usersController from './controllers/users';
import usersValidators from './validators/users';

import contestsValidator from './validators/contests';
import contestsController from './controllers/contests';

import emailVerificationsController from './controllers/emailVerifications';
import emailVerificationsValidator from './validators/emailVerifications';

import announcementsController from './controllers/announcements';
import announcementsValidator from './validators/announcements';

const router = express.Router();

router.get('/', (req: express.Request, res: express.Response) => {
  res.json({
    error: 0,
    error_msg: '',
    data: {
      name: 'database-gateway',
      description: 'Database Gateway',
      homepage: 'https://docs.google.com/document/d/1ppL_pF9qZ5rNGpR5XslMHkZFKD2_sxZRPMFrUPRVCBM/edit?usp=sharing',
      version: '2.0.0',
    },
  });
});

router.get('/timestamp', (req: express.Request, res: express.Response) => {
  res.json({
    data: { timestamp: utils.getCurrentTimestamp() },
    error: 0,
    error_msg: '',
  });
});

// Participations
router.post(
  '/participations/create',
  participationsValidator.createParticipation,
  participationsController.createParticipation,
);
router.post(
  '/participations/read',
  participationsValidator.readParticipation,
  participationsController.readParticipation,
);
router.post(
  '/participations/update',
  participationsValidator.updateParticipation,
  participationsController.updateParticipation,
);
router.post(
  '/participations/delete',
  participationsValidator.deleteParticipation,
  participationsController.deleteParticipation,
);
router.get(
  '/participations',
  parseQueryString,
  participationsValidator.readParticipation,
  participationsController.readParticipation,
);

// Users
router.post('/users/create', usersValidators.createUser, usersController.createUser);
router.post('/users/read', usersValidators.readUser, usersController.readUser);
router.post('/users/update', usersValidators.updateUser, usersController.updateUser);
router.post('/users/delete', usersValidators.deleteUser, usersController.deleteUser);
router.get('/users', parseQueryString, usersValidators.readUser, usersController.readUser);

// Contests
router.post('/contests/create', contestsValidator.createContest, contestsController.createContest);
router.post('/contests/read', contestsValidator.readContest, contestsController.readContest);
router.post('/contests/update', contestsValidator.updateContest, contestsController.updateContest);
router.post('/contests/delete', contestsValidator.deleteContest, contestsController.deleteContest);
router.get('/contests', parseQueryString, contestsValidator.readContest, contestsController.readContest);

// Email Verifications
router.post(
  '/email_verifications/create',
  emailVerificationsValidator.createEmailVerification,
  emailVerificationsController.createEmailVerification,
);
router.post(
  '/email_verifications/read',
  emailVerificationsValidator.readEmailVerification,
  emailVerificationsController.readEmailVerification,
);
router.post(
  '/email_verifications/update',
  emailVerificationsValidator.updateEmailVerification,
  emailVerificationsController.updateEmailVerification,
);
router.post(
  '/email_verifications/delete',
  emailVerificationsValidator.deleteEmailVerification,
  emailVerificationsController.deleteEmailVerification,
);
router.get(
  '/email_verifications',
  parseQueryString,
  emailVerificationsValidator.readEmailVerification,
  emailVerificationsController.readEmailVerification,
);

// Announcements
router.post(
  '/announcements/create',
  announcementsValidator.createAnnouncement,
  announcementsController.createAnnouncement,
);
router.post('/announcements/read', announcementsValidator.readAnnouncement, announcementsController.readAnnouncement);
router.post(
  '/announcements/update',
  announcementsValidator.updateAnnouncement,
  announcementsController.updateAnnouncement,
);
router.post(
  '/announcements/delete',
  announcementsValidator.deleteAnnouncement,
  announcementsController.deleteAnnouncement,
);
router.get(
  '/announcements',
  parseQueryString,
  announcementsValidator.readAnnouncement,
  announcementsController.readAnnouncement,
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
router.use((error: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(error);
  if (error instanceof LogicError) {
    res.status(400).json(error);
  } else if ('sqlMessage' in error) {
    res.status(400).json({
      ...ERRORS.SQL_ERROR,
      error_msg: error.toString(),
    });
  } else {
    res.status(500).json({
      ...ERRORS.SERVER_ERROR,
      error_msg: error.toString(),
    });
  }
});

export default router;
