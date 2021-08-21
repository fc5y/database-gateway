import { JSONSchemaType } from 'ajv';
import { WhereClause, OrderByClause, whereClauseSchema, orderByClauseSchema } from './common';

export interface createUserParams {
  values: {
    username: string;
    full_name: string;
    email: string;
    school_name: string;
    password: string;
    avatar: string | null;
  };
}

const createUserParamsSchema: JSONSchemaType<createUserParams> = {
  type: 'object',
  required: ['values'],
  properties: {
    values: {
      type: 'object',
      required: ['username', 'full_name', 'email', 'school_name', 'password'],
      properties: {
        username: { type: 'string' },
        full_name: { type: 'string' },
        email: { type: 'string' },
        school_name: { type: 'string' },
        password: { type: 'string' },
        avatar: { type: 'string', nullable: true },
      },
      additionalProperties: false,
    },
  },
};

export interface readUserParams {
  offset: number;
  limit: number;
  has_total?: boolean;
  order_by?: OrderByClause;
  where?: WhereClause;
}

const readUserParamsSchema: JSONSchemaType<readUserParams> = {
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

export interface updateUserParams {
  where: WhereClause;
  values: {
    username?: string;
    full_name?: string;
    email?: string;
    school_name?: string;
    password?: string;
    avatar?: string;
  };
}

const updateUserParamsSchema: JSONSchemaType<updateUserParams> = {
  type: 'object',
  required: ['values', 'where'],
  properties: {
    where: whereClauseSchema,
    values: {
      type: 'object',
      required: [],
      properties: {
        username: { type: 'string', nullable: true },
        full_name: { type: 'string', nullable: true },
        email: { type: 'string', nullable: true },
        school_name: { type: 'string', nullable: true },
        password: { type: 'string', nullable: true },
        avatar: { type: 'string', nullable: true },
      },
      additionalProperties: false,
    },
  },
} as any;

export interface deleteUserParams {
  where: WhereClause;
}

const deleteUserParamsSchema: JSONSchemaType<deleteUserParams> = {
  type: 'object',
  required: ['where'],
  properties: {
    where: whereClauseSchema,
  },
} as any;

export { createUserParamsSchema, readUserParamsSchema, updateUserParamsSchema, deleteUserParamsSchema };
