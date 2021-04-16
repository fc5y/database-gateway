import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';

import knex from './db';
import * as utils from './utils';
import { ERRORS, LogicError } from './errors';

import parseQueryString from './middlewares/parseQueryString';
import participationsValidator from './validators/participations';
import participationsController from './controllers/participations';

const app = express();
const port = 3000;

app.set('json spaces', 2); // optional, format json responses with 2 spaces
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/db/v2/timestamp', (req: express.Request, res: express.Response) => {
  res.json({ timestamp: utils.getCurrentTimestamp() });
});

app.get('/db/v2/contests', (req: express.Request, res: express.Response) => {
  knex
    .select('*')
    .from('Contests')
    .then((rows) => {
      res.json(rows);
    });
});

// Participations
app.post(
  '/db/v2/participations/create',
  participationsValidator.createParticipation,
  participationsController.createParticipation
);
app.post(
  '/db/v2/participations/read',
  participationsValidator.readParticipation,
  participationsController.readParticipation
);
app.post(
  '/db/v2/participations/update',
  participationsValidator.updateParticipation,
  participationsController.updateParticipation
);
app.post(
  '/db/v2/participations/delete',
  participationsValidator.deleteParticipation,
  participationsController.deleteParticipation
);
app.get(
  '/db/v2/participations',
  parseQueryString,
  participationsValidator.readParticipation,
  participationsController.readParticipation
);

app.use(
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

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
