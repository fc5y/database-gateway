import {
  createUserParamsSchema,
  readUserParamsSchema,
  updateUserParamsSchema,
  deleteUserParamsSchema,
} from '../schemas/users';
import { GeneralError } from '../errors';
import { assertWithSchema } from '../validation';

describe('createUserParamsSchema', () => {
  it('should not pass for request with missing values', () => {
    const req_body = {
      values: {
        username: 'freecontest',
        full_name: 'Free Contest',
        email: 'support@freecontest.net',
        password: '123456',
      },
    };

    expect(() => assertWithSchema(req_body, createUserParamsSchema)).toThrow(GeneralError);
  });

  it('should not pass for request with unknown values', () => {
    const req_body = {
      values: {
        username: 'freecontest',
        full_name: 'Free Contest',
        email: 'support@freecontest.net',
        school_name: '',
        password: '123456',
        avatar: 'https://freecontest.net/logo.png',
        rating: 0,
      },
    };

    expect(() => assertWithSchema(req_body, createUserParamsSchema)).toThrow(GeneralError);
  });

  it('should pass for valid request', () => {
    const req_body = {
      values: {
        username: 'freecontest',
        full_name: 'Free Contest',
        email: 'support@freecontest.net',
        school_name: '',
        password: '123456',
        avatar: 'https://freecontest.net/logo.png',
      },
    };

    expect(() => assertWithSchema(req_body, createUserParamsSchema)).not.toThrow();
  });
});

describe('readUserParamsSchema', () => {
  it('should not pass for request without offset or limit', () => {
    const req_body_no_limit = {
      offset: 0,
    };
    const req_body_no_offset = {
      limit: 0,
    };

    expect(() => assertWithSchema(req_body_no_limit, readUserParamsSchema)).toThrow(GeneralError);
    expect(() => assertWithSchema(req_body_no_offset, readUserParamsSchema)).toThrow(GeneralError);
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

    expect(() => assertWithSchema(req_body_negative_offset, readUserParamsSchema)).toThrow(GeneralError);
    expect(() => assertWithSchema(req_body_negative_limit, readUserParamsSchema)).toThrow(GeneralError);
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
      where: { username: 'freecontest' },
    };

    const req_body_array_where = {
      offset: 0,
      limit: 100,
      has_total: true,
      where: [['id', '<', 999], 'username="freecontest"'],
    };

    const req_body_order_by = {
      offset: 0,
      limit: 100,
      has_total: true,
      order_by: [{ column: 'school_name', order: 'desc' }, 'username'],
    };

    const req_body_all = {
      offset: 0,
      limit: 100,
      has_total: true,
      where: [['id', '<', 999], 'username="freecontest"'],
      order_by: [{ column: 'school_name', order: 'desc' }, 'username'],
    };

    expect(() => assertWithSchema(req_body_basic, readUserParamsSchema)).not.toThrow();
    expect(() => assertWithSchema(req_body_has_total, readUserParamsSchema)).not.toThrow();
    expect(() => assertWithSchema(req_body_object_where, readUserParamsSchema)).not.toThrow();
    expect(() => assertWithSchema(req_body_array_where, readUserParamsSchema)).not.toThrow();
    expect(() => assertWithSchema(req_body_order_by, readUserParamsSchema)).not.toThrow();
    expect(() => assertWithSchema(req_body_all, readUserParamsSchema)).not.toThrow();
  });
});

describe('updateUserParamsSchema', () => {
  it('should not pass for request without where clause', () => {
    const req_body = {
      values: {
        full_name: 'Free Contest 5Y',
      },
    };

    expect(() => assertWithSchema(req_body, updateUserParamsSchema)).toThrow(GeneralError);
  });

  it('should pass for valid request', () => {
    const req_body = {
      where: {
        username: 'freecontest',
      },
      values: {
        full_name: 'Free Contest 5Y',
      },
    };

    expect(() => assertWithSchema(req_body, updateUserParamsSchema)).not.toThrow();
  });
});

describe('deleteUserParamsSchema', () => {
  it('should not pass for request without where clause', () => {
    const req_body = {};

    expect(() => assertWithSchema(req_body, deleteUserParamsSchema)).toThrow(GeneralError);
  });

  it('should pass for valid request', () => {
    const req_body = {
      where: {
        username: 'freecontest',
      },
    };

    expect(() => assertWithSchema(req_body, deleteUserParamsSchema)).not.toThrow();
  });
});
