import { Request, Response, NextFunction } from 'express';
import { RequestBodySchema } from '../schemas';
import knex from '../db';

const createParticipation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { values } = req.body as RequestBodySchema;
    await knex('Participations').insert(values);

    res.json({
      error: 0
    });
  } catch (err) {
    next(err);
  }
};

const readParticipation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { offset, limit, where } = req.body as RequestBodySchema;

    const query = knex('Participations')
      .select('*')
      .offset(offset)
      .limit(limit);
    if (Array.isArray(where)) {
      for (const condition of where) {
        query.where(condition);
      }
    }

    const items = await query;

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
  try {
    const { where, values } = req.body as RequestBodySchema;

    const query = knex('Participations');
    if (Array.isArray(where)) {
      for (const condition of where) {
        query.where(condition);
      }
    }
    if (Array.isArray(values)) {
      for (const value of values) {
        query.update(value);
      }
    }

    await query;

    res.json({
      error: 0
    });
  } catch (err) {
    next(err);
  }
};

const deleteParticipation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { where } = req.body as RequestBodySchema;

    const query = knex('Participations').del();
    if (Array.isArray(where)) {
      for (const condition of where) {
        query.where(condition);
      }
    }

    await query;

    res.json({
      error: 0
    });
  } catch (err) {
    next(err);
  }
};

export default {
  createParticipation,
  readParticipation,
  updateParticipation,
  deleteParticipation
};
