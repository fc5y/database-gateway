import {
  createContestParamsSchema,
  readContestParamsSchema,
  updateContestParamsSchema,
  deleteContestParamsSchema,
} from '../schemas/contests';
import { GeneralError } from '../errors';
import { assertWithSchema } from '../validation';

describe('createContestParamsSchema', () => {
  it('should not pass for request with missing values', () => {
    const req_body = {
      values: {
        contest_name: 'test-contest',
        contest_title: 'Test Contest',
        start_time: 1234567890,
        duration: 10800,
      },
    };

    expect(() => assertWithSchema(req_body, createContestParamsSchema)).toThrow(GeneralError);
  });

  it('should not pass for request with unknown values', () => {
    const req_body = {
      values: {
        contest_name: 'test-contest',
        contest_title: 'Test Contest',
        start_time: 1234567890,
        duration: 10800,
        can_enter: true,
        materials: '{}',
        total_participations: 0,
      },
    };

    expect(() => assertWithSchema(req_body, createContestParamsSchema)).toThrow(GeneralError);
  });

  it('should pass for valid request', () => {
    const req_body = {
      values: {
        contest_name: 'test-contest',
        contest_title: 'Test Contest',
        start_time: 1234567890,
        duration: 10800,
        can_enter: true,
        materials: '{}',
      },
    };

    expect(() => assertWithSchema(req_body, createContestParamsSchema)).not.toThrow();
  });
});

describe('readContestParamsSchema', () => {
  it('should not pass for request without offset or limit', () => {
    const req_body_no_limit = {
      offset: 0,
    };
    const req_body_no_offset = {
      limit: 0,
    };

    expect(() => assertWithSchema(req_body_no_limit, readContestParamsSchema)).toThrow(GeneralError);
    expect(() => assertWithSchema(req_body_no_offset, readContestParamsSchema)).toThrow(GeneralError);
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

    expect(() => assertWithSchema(req_body_negative_offset, readContestParamsSchema)).toThrow(GeneralError);
    expect(() => assertWithSchema(req_body_negative_limit, readContestParamsSchema)).toThrow(GeneralError);
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
      where: { contest_title: 'Test Contest' },
    };

    const req_body_array_where = {
      offset: 0,
      limit: 100,
      has_total: true,
      where: [['id', '<', 999], 'contest_title="Test Contest"'],
    };

    const req_body_order_by = {
      offset: 0,
      limit: 100,
      has_total: true,
      order_by: [{ column: 'start_time', order: 'desc' }, 'duration'],
    };

    const req_body_all = {
      offset: 0,
      limit: 100,
      has_total: true,
      where: [['id', '<', 999], 'contest_title="Test Contest"'],
      order_by: [{ column: 'start_time', order: 'desc' }, 'duration'],
    };

    expect(() => assertWithSchema(req_body_basic, readContestParamsSchema)).not.toThrow();
    expect(() => assertWithSchema(req_body_has_total, readContestParamsSchema)).not.toThrow();
    expect(() => assertWithSchema(req_body_object_where, readContestParamsSchema)).not.toThrow();
    expect(() => assertWithSchema(req_body_array_where, readContestParamsSchema)).not.toThrow();
    expect(() => assertWithSchema(req_body_order_by, readContestParamsSchema)).not.toThrow();
    expect(() => assertWithSchema(req_body_all, readContestParamsSchema)).not.toThrow();
  });
});

describe('updateContestParamsSchema', () => {
  it('should not pass for request without where clause', () => {
    const req_body = {
      values: {
        can_enter: false,
      },
    };

    expect(() => assertWithSchema(req_body, updateContestParamsSchema)).toThrow(GeneralError);
  });

  it('should pass for valid request', () => {
    const req_body = {
      where: {
        contest_name: 'test-contest',
      },
      values: {
        can_enter: false,
      },
    };

    expect(() => assertWithSchema(req_body, updateContestParamsSchema)).not.toThrow();
  });
});

describe('deleteContestParamsSchema', () => {
  it('should not pass for request without where clause', () => {
    const req_body = {};

    expect(() => assertWithSchema(req_body, deleteContestParamsSchema)).toThrow(GeneralError);
  });

  it('should pass for valid request', () => {
    const req_body = {
      where: {
        contest_name: 'test-contest',
      },
    };

    expect(() => assertWithSchema(req_body, deleteContestParamsSchema)).not.toThrow();
  });
});
