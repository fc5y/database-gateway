import {
  createEmailVerificationParamsSchema,
  readEmailVerificationParamsSchema,
  updateEmailVerificationParamsSchema,
  deleteEmailVerificationParamsSchema,
} from '../schemas/emailVerifications';
import { GeneralError } from '../errors';
import { assertWithSchema } from '../validation';

describe('createEmailVerificationParamsSchema', () => {
  it('should not pass for request with missing values', () => {
    const req_body = {
      values: {
        email: 'support@freecontest.net',
        otp: '123456',
      },
    };

    expect(() => assertWithSchema(req_body, createEmailVerificationParamsSchema)).toThrow(GeneralError);
  });

  it('should not pass for request with unknown values', () => {
    const req_body = {
      values: {
        email: 'support@freecontest.net',
        otp: '123456',
        expired: true,
        expired_time: 1234567890,
      },
    };

    expect(() => assertWithSchema(req_body, createEmailVerificationParamsSchema)).toThrow(GeneralError);
  });

  it('should pass for valid request', () => {
    const req_body = {
      values: {
        email: 'support@freecontest.net',
        otp: '123456',
        expired_time: 1234567890,
      },
    };

    expect(() => assertWithSchema(req_body, createEmailVerificationParamsSchema)).not.toThrow();
  });
});

describe('readEmailVerificationParamsSchema', () => {
  it('should not pass for request without offset or limit', () => {
    const req_body_no_limit = {
      offset: 0,
    };
    const req_body_no_offset = {
      limit: 0,
    };

    expect(() => assertWithSchema(req_body_no_limit, readEmailVerificationParamsSchema)).toThrow(GeneralError);
    expect(() => assertWithSchema(req_body_no_offset, readEmailVerificationParamsSchema)).toThrow(GeneralError);
  });

  it('should not pass for request with negative offset or limit', () => {
    const req_body_negative_offset = {
      offset: -10,
      limit: 0,
    };
    const req_body_negative_limit = {
      offset: 0,
      limit: -10,
    };

    expect(() => assertWithSchema(req_body_negative_offset, readEmailVerificationParamsSchema)).toThrow(GeneralError);
    expect(() => assertWithSchema(req_body_negative_limit, readEmailVerificationParamsSchema)).toThrow(GeneralError);
  });

  it('should pass for valid request', () => {
    const req_body_basic = {
      offset: 0,
      limit: 100,
    };

    const req_body_has_total = {
      offset: 0,
      limit: 100,
      has_total: true,
    };

    const req_body_object_where = {
      offset: 0,
      limit: 100,
      has_total: true,
      where: { email: 'support@freecontest.net' },
    };

    const req_body_array_where = {
      offset: 0,
      limit: 100,
      has_total: true,
      where: [['id', '<', 999], 'email="support@freecontest.net"'],
    };

    const req_body_order_by = {
      offset: 0,
      limit: 100,
      has_total: true,
      order_by: [{ column: 'expired_time', order: 'desc' }, 'otp'],
    };

    const req_body_all = {
      offset: 0,
      limit: 100,
      has_total: true,
      where: [['id', '<', 999], 'email="support@freecontest.net"'],
      order_by: [{ column: 'expired_time', order: 'desc' }, 'otp'],
    };

    expect(() => assertWithSchema(req_body_basic, readEmailVerificationParamsSchema)).not.toThrow();
    expect(() => assertWithSchema(req_body_has_total, readEmailVerificationParamsSchema)).not.toThrow();
    expect(() => assertWithSchema(req_body_object_where, readEmailVerificationParamsSchema)).not.toThrow();
    expect(() => assertWithSchema(req_body_array_where, readEmailVerificationParamsSchema)).not.toThrow();
    expect(() => assertWithSchema(req_body_order_by, readEmailVerificationParamsSchema)).not.toThrow();
    expect(() => assertWithSchema(req_body_all, readEmailVerificationParamsSchema)).not.toThrow();
  });
});

describe('updateEmailVerificationParamsSchema', () => {
  it('should not pass for request without where clause', () => {
    const req_body = {
      values: {
        expired_time: 9876543210,
      },
    };

    expect(() => assertWithSchema(req_body, updateEmailVerificationParamsSchema)).toThrow(GeneralError);
  });

  it('should pass for valid request', () => {
    const req_body = {
      where: {
        email: 'support@freecontest.net',
      },
      values: {
        expired_time: 9876543210,
      },
    };

    expect(() => assertWithSchema(req_body, updateEmailVerificationParamsSchema)).not.toThrow();
  });
});

describe('deleteEmailVerificationParamsSchema', () => {
  it('should not pass for request without where clause', () => {
    const req_body = {};

    expect(() => assertWithSchema(req_body, deleteEmailVerificationParamsSchema)).toThrow(GeneralError);
  });

  it('should pass for valid request', () => {
    const req_body = {
      where: {
        email: 'support@freecontest.net',
      },
    };

    expect(() => assertWithSchema(req_body, deleteEmailVerificationParamsSchema)).not.toThrow();
  });
});
