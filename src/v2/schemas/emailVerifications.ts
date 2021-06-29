import { JSONSchemaType } from 'ajv';
import { CustomWhere, customWhereSchema } from './common';

export interface createEmailVerificationParams {
  values: {
    email: string;
    otp: string;
    expired_time: number;
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
  where?: CustomWhere;
}

const readEmailVerificationParamsSchema: JSONSchemaType<readEmailVerificationParams> = {
  type: 'object',
  required: ['offset', 'limit'],
  properties: {
    offset: { type: 'integer' },
    limit: { type: 'integer' },
    has_total: { type: 'boolean', nullable: true },
    order_by: { type: 'array', nullable: true, items: { type: 'string' } },
    where: customWhereSchema,
  },
  additionalProperties: false,
} as any;

export interface updateEmailVerificationParams {
  where: CustomWhere;
  values: {
    email?: string;
    otp?: string;
    expired_time?: number;
  };
}

const updateEmailVerificationParamsSchema: JSONSchemaType<updateEmailVerificationParams> = {
  type: 'object',
  required: ['values', 'where'],
  properties: {
    where: customWhereSchema,
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
  where: CustomWhere;
}

const deleteEmailVerificationParamsSchema: JSONSchemaType<deleteEmailVerificationParams> = {
  type: 'object',
  required: ['where'],
  properties: {
    where: customWhereSchema,
  },
  additionalProperties: false,
} as any;

export {
  createEmailVerificationParamsSchema,
  readEmailVerificationParamsSchema,
  updateEmailVerificationParamsSchema,
  deleteEmailVerificationParamsSchema,
};
