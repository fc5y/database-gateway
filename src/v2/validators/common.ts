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

const createFieldsValidator = (fields: Array<string>) => {
  const containsOnlyFields: CustomValidator = (value: any) => {
    if (typeof value !== 'object') {
      throw new Error('Not an object');
    }
    if (!Object.keys(value).every((item) => fields.includes(item))) {
      throw new Error('Object contains unknown field');
    }
    return true;
  };
  return containsOnlyFields;
};

function validationMiddleware(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new LogicError({ ...ERRORS.VALIDATION_FAILED });
  } else {
    return next();
  }
}

export { isArrayOfObjects, createFieldsValidator, validationMiddleware };
