import dotenv from 'dotenv';
dotenv.config();

import Express from 'express';
import { Request, Response, NextFunction } from 'express';

import knex from './db';
import * as utils from './utils';
import { ERRORS, LogicError } from './errors';

import participationsValidator from './validators/participations';
import participationsController from './controllers/participations';

const app = Express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/db/v2/timestamp', (req: Express.Request, res: Express.Response) => {
  res.json({ timestamp: utils.getCurrentTimestamp() });
});

app.get('/db/v2/contests', (req: Express.Request, res: Express.Response) => {
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

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  if (error instanceof LogicError) {
    res.status(400).json(error);
  } else {
    res.status(500).json({
      ...ERRORS.SERVER_ERROR
    });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
