import {
  createParticipationParamsSchema,
  readParticipationParamsSchema,
  updateParticipationParamsSchema,
  deleteParticipationParamsSchema,
} from '../schemas/participations';
import { GeneralError } from '../errors';
import { assertWithSchema } from '../validation';

describe('createParticipationParamsSchema', () => {
  it('should not pass for request with missing values', () => {
    const req_body = {
      values: {
        user_id: 1,
        contest_id: 1,
        rank_in_contest: 1,
        rating: 1,
        rating_change: 1,
        score: 100,
        is_hidden: false,
      },
    };

    expect(() => assertWithSchema(req_body, createParticipationParamsSchema)).toThrow(GeneralError);
  });

  it('should not pass for request with unknown values', () => {
    const req_body = {
      values: {
        user_id: 1,
        contest_id: 1,
        rank_in_contest: 1,
        rating: 1,
        rating_change: 1,
        score: 100,
        is_hidden: false,
        contest_password: 'abcdefgh',
        synced: true,
        cheating: false,
      },
    };

    expect(() => assertWithSchema(req_body, createParticipationParamsSchema)).toThrow(GeneralError);
  });

  it('should pass for valid request', () => {
    const req_body = {
      values: {
        user_id: 1,
        contest_id: 1,
        rank_in_contest: 1,
        rating: 1,
        rating_change: 1,
        score: 100,
        is_hidden: false,
        contest_password: 'abcdefgh',
        synced: true,
      },
    };

    expect(() => assertWithSchema(req_body, createParticipationParamsSchema)).not.toThrow();
  });
});

describe('readParticipationParamsSchema', () => {
  it('should not pass for request without offset or limit', () => {
    const req_body_no_limit = {
      offset: 0,
    };
    const req_body_no_offset = {
      limit: 0,
    };

    expect(() => assertWithSchema(req_body_no_limit, readParticipationParamsSchema)).toThrow(GeneralError);
    expect(() => assertWithSchema(req_body_no_offset, readParticipationParamsSchema)).toThrow(GeneralError);
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

    expect(() => assertWithSchema(req_body_negative_offset, readParticipationParamsSchema)).toThrow(GeneralError);
    expect(() => assertWithSchema(req_body_negative_limit, readParticipationParamsSchema)).toThrow(GeneralError);
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
      where: { contest_id: 1 },
    };

    const req_body_array_where = {
      offset: 0,
      limit: 100,
      has_total: true,
      where: [['id', '<', 999], 'contest_id=1'],
    };

    const req_body_order_by = {
      offset: 0,
      limit: 100,
      has_total: true,
      order_by: [{ column: 'score', order: 'desc' }, 'rank_in_contest'],
    };

    const req_body_all = {
      offset: 0,
      limit: 100,
      has_total: true,
      where: [['id', '<', 999], 'contest_id=1'],
      order_by: [{ column: 'score', order: 'desc' }, 'rank_in_contest'],
    };

    expect(() => assertWithSchema(req_body_basic, readParticipationParamsSchema)).not.toThrow();
    expect(() => assertWithSchema(req_body_has_total, readParticipationParamsSchema)).not.toThrow();
    expect(() => assertWithSchema(req_body_object_where, readParticipationParamsSchema)).not.toThrow();
    expect(() => assertWithSchema(req_body_array_where, readParticipationParamsSchema)).not.toThrow();
    expect(() => assertWithSchema(req_body_order_by, readParticipationParamsSchema)).not.toThrow();
    expect(() => assertWithSchema(req_body_all, readParticipationParamsSchema)).not.toThrow();
  });
});

describe('updateParticipationParamsSchema', () => {
  it('should not pass for request without where clause', () => {
    const req_body = {
      values: {
        is_hidden: true,
      },
    };

    expect(() => assertWithSchema(req_body, updateParticipationParamsSchema)).toThrow(GeneralError);
  });

  it('should pass for valid request', () => {
    const req_body = {
      where: {
        user_id: 1,
      },
      values: {
        is_hidden: true,
      },
    };

    expect(() => assertWithSchema(req_body, updateParticipationParamsSchema)).not.toThrow();
  });
});

describe('deleteParticipationParamsSchema', () => {
  it('should not pass for request without where clause', () => {
    const req_body = {};

    expect(() => assertWithSchema(req_body, deleteParticipationParamsSchema)).toThrow(GeneralError);
  });

  it('should pass for valid request', () => {
    const req_body = {
      where: {
        user_id: 1,
      },
    };

    expect(() => assertWithSchema(req_body, deleteParticipationParamsSchema)).not.toThrow();
  });
});
