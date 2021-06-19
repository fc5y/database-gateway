import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { ERRORS, LogicError } from '../errors';

function validationMiddleware(req: Request, res: Response, next: NextFunction): void {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new LogicError({ ...ERRORS.VALIDATION_FAILED });
  } else {
    return next();
  }
}

function isWhereClause(value: unknown): boolean {
  if (typeof value === 'string') {
    return true;
  }
  if (Array.isArray(value) && value.length == 3) {
    return true;
  }
  throw new Error('where clause must be a string or an array of length 3');
}

export { validationMiddleware, isWhereClause };
