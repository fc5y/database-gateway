import { JSONSchemaType } from 'ajv';

export interface createEmailVerificationParams {
  values: {
    email: string;
    otp: string;
    expired_time: number | Date;
  };
}

const createEmailVerificationParamsSchema: JSONSchemaType<createEmailVerificationParams> = {
  type: 'object',
  required: ['values'],
  properties: {
    values: {
      type: 'object',
      required: ['email', 'otp', 'expired_time'],
      properties: {
        email: { type: 'string' },
        otp: { type: 'string' },
        expired_time: { type: 'integer' },
      },
      additionalProperties: false,
    },
  },
  additionalProperties: false,
};

export interface readEmailVerificationParams {
  offset: number;
  limit: number;
  has_total?: boolean;
  order_by?: Array<string>;
  where?: Record<string, unknown> | Array<string | [any, any, any]>;
}

const readEmailVerificationParamsSchema: JSONSchemaType<readEmailVerificationParams> = {
  type: 'object',
  required: ['offset', 'limit'],
  properties: {
    offset: { type: 'integer' },
    limit: { type: 'integer' },
    has_total: { type: 'boolean', nullable: true },
    order_by: { type: 'array', nullable: true, items: { type: 'string' } },
    where: {
      type: ['object', 'array'],
      nullable: true,
      required: [],
      items: {
        type: ['string', 'array'],
        items: [{}, {}, {}],
        minLength: 1,
        minItems: 3,
        maxItems: 3,
      },
    },
  },
  additionalProperties: false,
} as any;

export interface updateEmailVerificationParams {
  where: Record<string, unknown> | Array<string | [any, any, any]>;
  values: {
    email?: string;
    otp?: string;
    expired_time?: number | Date;
  };
}

const updateEmailVerificationParamsSchema: JSONSchemaType<updateEmailVerificationParams> = {
  type: 'object',
  required: ['values', 'where'],
  properties: {
    where: {
      type: ['object', 'array'],
      required: [],
      items: {
        type: ['string', 'array'],
        items: [{}, {}, {}],
        minLength: 1,
        minItems: 3,
        maxItems: 3,
      },
    },
    values: {
      type: 'object',
      required: [],
      properties: {
        email: { type: 'string', nullable: true },
        otp: { type: 'string', nullable: true },
        expired_time: { type: 'integer', nullable: true },
      },
      additionalProperties: false,
    },
  },
  additionalProperties: false,
} as any;

export interface deleteEmailVerificationParams {
  where: Record<string, unknown> | Array<string | [any, any, any]>;
}

const deleteEmailVerificationParamsSchema: JSONSchemaType<deleteEmailVerificationParams> = {
  type: 'object',
  required: ['where'],
  properties: {
    where: {
      type: ['object', 'array'],
      required: [],
      items: {
        type: ['string', 'array'],
        items: [{}, {}, {}],
        minLength: 1,
        minItems: 3,
        maxItems: 3,
      },
    },
  },
  additionalProperties: false,
} as any;

export {
  createEmailVerificationParamsSchema,
  readEmailVerificationParamsSchema,
  updateEmailVerificationParamsSchema,
  deleteEmailVerificationParamsSchema,
};
