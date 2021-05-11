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

export { validationMiddleware };
