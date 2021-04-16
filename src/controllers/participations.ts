import { Request, Response, NextFunction } from 'express';
import { RequestBodySchema } from '../schemas';
import knex from '../db';

const createParticipation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.send('Not implemented');
};

const readParticipation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { offset, limit } = req.body as RequestBodySchema;
    const where = req.body?.where || [];

    const items = await knex
      .select('*')
      .from('Participations')
      .where(where)
      .offset(offset)
      .limit(limit);

    res.json({
      error: 0,
      data: {
        total: items.length,
        items
      }
    });
  } catch (err) {
    next(err);
  }
};

const updateParticipation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.send('Not implemented');
};

const deleteParticipation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.send('Not implemented');
};

export default {
  createParticipation,
  readParticipation,
  updateParticipation,
  deleteParticipation
};
