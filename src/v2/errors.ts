import { ResponseBodySchema } from './schemas';

const ERRORS: { [name: string]: ResponseBodySchema } = {
  BAD_REQUEST: {
    error: 1001,
    error_msg: 'Bad request',
  },
  VALIDATION_FAILED: {
    error: 1009,
    error_msg: 'Validation failed',
  },
  SERVER_ERROR: {
    error: 4000,
    error_msg: 'Server error',
  },
};

class LogicError extends Error {
  error: number;
  error_msg?: string;

  constructor({ error, error_msg }: ResponseBodySchema, ...params: any[]) {
    super(...params);
    this.error = error;
    this.error_msg = error_msg;
  }
}

export { ERRORS, LogicError };
