import { JSONSchemaType } from 'ajv';
import { WhereClause, OrderByClause, whereClauseSchema, orderByClauseSchema } from './common';

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
};

export interface readEmailVerificationParams {
  offset: number;
  limit: number;
  has_total?: boolean;
  order_by?: OrderByClause;
  where?: WhereClause;
}

const readEmailVerificationParamsSchema: JSONSchemaType<readEmailVerificationParams> = {
  type: 'object',
  required: ['offset', 'limit'],
  properties: {
    offset: { type: 'integer', minimum: 0 },
    limit: { type: 'integer', minimum: 0 },
    has_total: { type: 'boolean', nullable: true },
    order_by: orderByClauseSchema,
    where: whereClauseSchema,
  },
} as any;

export interface updateEmailVerificationParams {
  where: WhereClause;
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
    where: whereClauseSchema,
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
} as any;

export interface deleteEmailVerificationParams {
  where: WhereClause;
}

const deleteEmailVerificationParamsSchema: JSONSchemaType<deleteEmailVerificationParams> = {
  type: 'object',
  required: ['where'],
  properties: {
    where: whereClauseSchema,
  },
} as any;

export {
  createEmailVerificationParamsSchema,
  readEmailVerificationParamsSchema,
  updateEmailVerificationParamsSchema,
  deleteEmailVerificationParamsSchema,
};
