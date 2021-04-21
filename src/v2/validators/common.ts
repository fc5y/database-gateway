import { Request, Response, NextFunction } from 'express';
import { CustomValidator, validationResult } from 'express-validator';
import { ERRORS, LogicError } from '../errors';

const isArrayOfObjects: CustomValidator = (value: any) => {
  if (
    !Array.isArray(value) ||
    !value.every((item) => typeof item === 'object')
  ) {
    throw new Error('Not an array of objects');
  }
  return true;
};

function validationMiddleware(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new LogicError({ ...ERRORS.VALIDATION_FAILED });
  } else {
    return next();
  }
}

export { isArrayOfObjects, validationMiddleware };
