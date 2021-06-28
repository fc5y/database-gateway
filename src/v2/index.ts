import express from 'express';

import * as utils from '../utils';
import { ERROR_CODE, GeneralError } from './errors';

import parseQueryString from './middlewares/parseQueryString';

import announcementsController from './controllers/announcements';
import contestsController from './controllers/contests';
import emailVerificationsController from './controllers/emailVerifications';
import participationsController from './controllers/participations';
import usersController from './controllers/users';

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
    error: 0,
    error_msg: 'Server time',
    data: { timestamp: utils.getCurrentTimestamp() },
  });
});

// Announcements
router.post('/announcements/create', announcementsController.createAnnouncement);
router.post('/announcements/read', announcementsController.readAnnouncement);
router.post('/announcements/update', announcementsController.updateAnnouncement);
router.post('/announcements/delete', announcementsController.deleteAnnouncement);
router.get('/announcements', parseQueryString, announcementsController.readAnnouncement);

// Contests
router.post('/contests/create', contestsController.createContest);
router.post('/contests/read', contestsController.readContest);
router.post('/contests/update', contestsController.updateContest);
router.post('/contests/delete', contestsController.deleteContest);
router.get('/contests', parseQueryString, contestsController.readContest);

// Email Verifications
router.post('/email_verifications/create', emailVerificationsController.createEmailVerification);
router.post('/email_verifications/read', emailVerificationsController.readEmailVerification);
router.post('/email_verifications/update', emailVerificationsController.updateEmailVerification);
router.post('/email_verifications/delete', emailVerificationsController.deleteEmailVerification);
router.get('/email_verifications', parseQueryString, emailVerificationsController.readEmailVerification);

// Participations
router.post('/participations/create', participationsController.createParticipation);
router.post('/participations/read', participationsController.readParticipation);
router.post('/participations/update', participationsController.updateParticipation);
router.post('/participations/delete', participationsController.deleteParticipation);
router.get('/participations', parseQueryString, participationsController.readParticipation);

// Users
router.post('/users/create', usersController.createUser);
router.post('/users/read', usersController.readUser);
router.post('/users/update', usersController.updateUser);
router.post('/users/delete', usersController.deleteUser);
router.get('/users', parseQueryString, usersController.readUser);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
router.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err); // TODO: use a proper logger
  if (err instanceof GeneralError) {
    res.status(400).json({
      error: err.error,
      error_msg: err.error_msg,
      data: err.data,
    });
  } else if ('sqlMessage' in err) {
    res.status(400).json({
      error: ERROR_CODE.SQL_ERROR,
      error_msg: err.toString(),
    });
  } else {
    res.status(500).json({
      error: ERROR_CODE.UNKNOWN_ERROR,
      error_msg: err.toString(),
    });
  }
});

export default router;
