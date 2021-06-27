import { JSONSchemaType } from 'ajv';

export interface createUserParams {
  values: {
    username: string;
    full_name: string;
    email: string;
    school_name: string;
    password: string;
    avatar: string;
  };
}

const createUserParamsSchema: JSONSchemaType<createUserParams> = {
  type: 'object',
  required: ['values'],
  properties: {
    values: {
      type: 'object',
      required: ['username', 'full_name', 'email', 'school_name', 'password', 'avatar'],
      properties: {
        username: { type: 'string' },
        full_name: { type: 'string' },
        email: { type: 'string' },
        school_name: { type: 'string' },
        password: { type: 'string' },
        avatar: { type: 'string' },
      },
      additionalProperties: false,
    },
  },
  additionalProperties: false,
};

export interface readUserParams {
  offset: number;
  limit: number;
  has_total?: boolean;
  order_by?: Array<string>;
  where?: Record<string, unknown> | Array<string | [any, any, any]>;
}

const readUserParamsSchema: JSONSchemaType<readUserParams> = {
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

export interface updateUserParams {
  where: Record<string, unknown> | Array<string | [any, any, any]>;
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
  additionalProperties: false,
} as any;

export interface deleteUserParams {
  where: Record<string, unknown> | Array<string | [any, any, any]>;
}

const deleteUserParamsSchema: JSONSchemaType<deleteUserParams> = {
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

export { createUserParamsSchema, readUserParamsSchema, updateUserParamsSchema, deleteUserParamsSchema };
