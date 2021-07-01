import {
  createAnnouncementParamsSchema,
  readAnnouncementParamsSchema,
  updateAnnouncementParamsSchema,
  deleteAnnouncementParamsSchema,
} from './announcements';
import { GeneralError } from '../errors';
import { assertWithSchema } from '../validation';

describe('createAnnouncementParamsSchema', () => {
  it('should not pass for request with missing values', () => {
    const req_body = {
      values: {
        announcement_name: 'test-announcement',
        announcement_title: 'Test Announcement',
      },
    };

    expect(() => assertWithSchema(req_body, createAnnouncementParamsSchema)).toThrow(GeneralError);
  });

  it('should not pass for request with unknown values', () => {
    const req_body = {
      values: {
        announcement_name: 'test-announcement',
        announcement_title: 'Test Announcement',
        announcement_description: '',
        announcement_hidden: false,
      },
    };

    expect(() => assertWithSchema(req_body, createAnnouncementParamsSchema)).toThrow(GeneralError);
  });

  it('should pass for valid request', () => {
    const req_body = {
      values: {
        announcement_name: 'test-announcement',
        announcement_title: 'Test Announcement',
        announcement_description: '',
      },
    };

    expect(() => assertWithSchema(req_body, createAnnouncementParamsSchema)).not.toThrow();
  });
});

describe('readAnnouncementParamsSchema', () => {
  it('should not pass for request without offset or limit', () => {
    const req_body_no_limit = {
      offset: 0,
    };
    const req_body_no_offset = {
      limit: 0,
    };

    expect(() => assertWithSchema(req_body_no_limit, readAnnouncementParamsSchema)).toThrow(GeneralError);
    expect(() => assertWithSchema(req_body_no_offset, readAnnouncementParamsSchema)).toThrow(GeneralError);
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

    expect(() => assertWithSchema(req_body_negative_offset, readAnnouncementParamsSchema)).toThrow(GeneralError);
    expect(() => assertWithSchema(req_body_negative_limit, readAnnouncementParamsSchema)).toThrow(GeneralError);
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
      where: { announcement_title: 'Test Announcement' },
    };

    const req_body_array_where = {
      offset: 0,
      limit: 100,
      has_total: true,
      where: [['id', '<', 999], 'announcement_title="Test Announcement"'],
    };

    const req_body_order_by = {
      offset: 0,
      limit: 100,
      has_total: true,
      order_by: [{ column: 'created_at', order: 'desc' }, 'announcement_name'],
    };

    const req_body_all = {
      offset: 0,
      limit: 100,
      has_total: true,
      where: [['id', '<', 999], 'announcement_title="Test Announcement"'],
      order_by: [{ column: 'created_at', order: 'desc' }, 'announcement_name'],
    };

    expect(() => assertWithSchema(req_body_basic, readAnnouncementParamsSchema)).not.toThrow();
    expect(() => assertWithSchema(req_body_has_total, readAnnouncementParamsSchema)).not.toThrow();
    expect(() => assertWithSchema(req_body_object_where, readAnnouncementParamsSchema)).not.toThrow();
    expect(() => assertWithSchema(req_body_array_where, readAnnouncementParamsSchema)).not.toThrow();
    expect(() => assertWithSchema(req_body_order_by, readAnnouncementParamsSchema)).not.toThrow();
    expect(() => assertWithSchema(req_body_all, readAnnouncementParamsSchema)).not.toThrow();
  });
});

describe('updateAnnouncementParamsSchema', () => {
  it('should not pass for request without where clause', () => {
    const req_body = {
      values: {
        announcement_description: 'Lorem ipsum dolor sit amet',
      },
    };

    expect(() => assertWithSchema(req_body, updateAnnouncementParamsSchema)).toThrow(GeneralError);
  });

  it('should pass for valid request', () => {
    const req_body = {
      where: {
        announcement_name: 'test-announcement',
      },
      values: {
        announcement_description: 'Lorem ipsum dolor sit amet',
      },
    };

    expect(() => assertWithSchema(req_body, updateAnnouncementParamsSchema)).not.toThrow();
  });
});

describe('deleteAnnouncementParamsSchema', () => {
  it('should not pass for request without where clause', () => {
    const req_body = {};

    expect(() => assertWithSchema(req_body, deleteAnnouncementParamsSchema)).toThrow(GeneralError);
  });

  it('should pass for valid request', () => {
    const req_body = {
      where: {
        announcement_name: 'test-announcement',
      },
    };

    expect(() => assertWithSchema(req_body, deleteAnnouncementParamsSchema)).not.toThrow();
  });
});
