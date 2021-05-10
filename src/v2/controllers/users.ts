import express from 'express';
import knex from '../../db';
import { RequestBodySchema } from '../schemas';

async function createUser(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
  try {
    const { values } = req.body as RequestBodySchema;
    await knex('Users').insert(values);
    res.json({ error: 0 });
  } catch (err) {
    next(err);
  }
}

async function readUser(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
  try {
    const { offset, limit } = req.body as RequestBodySchema;
    const where = req.body?.where || {};
    const values = await knex('Users').select('*').where(where).offset(offset).limit(limit);
    const total = await knex('Users').count('*');
    res.json({
      error: 0,
      data: {
        total: total[0]['count(*)'],
        values,
      },
    });
  } catch (err) {
    next(err);
  }
}

async function updateUser(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
  try {
    const { where, values } = req.body as RequestBodySchema;
    await knex('User').where(where).update(values);

    res.json({ error: 0 });
  } catch (err) {
    next(err);
  }
}

async function deleteUser(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
  try {
    const { where } = req.body as RequestBodySchema;
    await knex('Users').where(where).del();
    res.json({ error: 0 });
  } catch (err) {
    next(err);
  }
}

export default {
  createUser,
  readUser,
  updateUser,
  deleteUser,
};
