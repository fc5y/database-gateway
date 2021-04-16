import { ResponseBodySchema } from './schemas';

const ERRORS: { [name: string]: ResponseBodySchema } = {
  BAD_REQUEST: {
    error: 1001,
    error_msg: 'Bad request'
  },
  VALIDATION_FAILED: {
    error: 1009,
    error_msg: 'Validation failed'
  },
  CONTEST_EXISTS: {
    error: 3101,
    error_msg: 'Contest already exists'
  },
  CREATE_CONTEST_ERROR: {
    error: 3102,
    error_msg: 'Cannot create contest'
  },
  USER_NOT_FOUND: {
    error: 2001,
    error_msg: 'User not found'
  },
  CONTEST_NOT_FOUND: {
    error: 2101,
    error_msg: 'Contest not found'
  },
  CMS_CONTEST_NOT_FOUND: {
    error: 2501,
    error_msg: 'CMS contest not found'
  },
  LOGIN_REQUIRED: {
    error: 3001,
    error_msg: 'Login required'
  },
  USERNAME_EXISTS: {
    error: 3002,
    error_msg: 'Username already exists'
  },
  EMAIL_EXISTS: {
    error: 3003,
    error_msg: 'Email already exists'
  },
  EMAIL_USERNAME_PASSWORD_INVALID: {
    error: 3006,
    error_msg: 'Email/Username or password is invalid'
  },
  OTP_INVALID: {
    error: 3008,
    error_msg: 'OTP invalid'
  },
  OTP_EXPIRED: {
    error: 3009,
    error_msg: 'OTP expired'
  },
  OTP_SEND_LIMIT_PER_EMAIL_EXCEEDED: {
    error: 3010,
    error_msg: 'OTP send limit exceeded (per email)'
  },
  OTP_SEND_LIMIT_OVERALL_EXCEEDED: {
    error: 3011,
    error_msg: 'OTP send limit exceeded (system)'
  },
  OTP_VERIFY_LIMIT_PER_EMAIL_EXCEEDED: {
    error: 3012,
    error_msg: 'OTP verify limit exceeded (per email)'
  },
  CANNOT_ENTER_CONTEST: {
    error: 3103,
    error_msg: 'Can not enter this contest'
  },
  NOT_REGISTERED_YET: {
    error: 3201,
    error_msg: 'Not registered yet'
  },
  NOT_SYNCED_YET: {
    error: 3202,
    error_msg: 'Not synced yet'
  },
  ADMIN_ROLE_REQUIRED: {
    error: 3300,
    error_msg: 'Admin role required'
  },
  SERVER_ERROR: {
    error: 4000,
    error_msg: 'Server error'
  },
  CMS_SERVER_ERROR: {
    error: 4100,
    error_msg: 'CMS Server error'
  },
  CMS_FETCH_ERROR: {
    error: 4101,
    error_msg: 'Fetching CMS failed'
  }
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
