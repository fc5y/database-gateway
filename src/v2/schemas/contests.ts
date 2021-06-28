import { JSONSchemaType } from 'ajv';

export interface createContestParams {
  values: {
    contest_name: string;
    start_time: number;
    duration: number;
    contest_title: string;
    can_enter: boolean;
    materials: string;
  };
}

const createContestParamsSchema: JSONSchemaType<createContestParams> = {
  type: 'object',
  required: ['values'],
  properties: {
    values: {
      type: 'object',
      required: ['contest_name', 'start_time', 'duration', 'contest_title', 'can_enter', 'materials'],
      properties: {
        contest_name: { type: 'string' },
        start_time: { type: 'integer' },
        duration: { type: 'integer' },
        contest_title: { type: 'string' },
        can_enter: { type: 'boolean' },
        materials: { type: 'string' },
      },
      additionalProperties: false,
    },
  },
  additionalProperties: false,
};

export interface readContestParams {
  offset: number;
  limit: number;
  has_total?: boolean;
  order_by?: Array<string>;
  where?: Record<string, unknown> | Array<string | [any, any, any]>;
}

const readContestParamsSchema: JSONSchemaType<readContestParams> = {
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

export interface updateContestParams {
  where: Record<string, unknown> | Array<string | [any, any, any]>;
  values: {
    contest_name?: string;
    start_time?: number;
    duration?: number;
    contest_title?: string;
    can_enter?: boolean;
    materials?: string;
  };
}

const updateContestParamsSchema: JSONSchemaType<updateContestParams> = {
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
        contest_name: { type: 'string', nullable: true },
        start_time: { type: 'integer', nullable: true },
        duration: { type: 'integer', nullable: true },
        contest_title: { type: 'string', nullable: true },
        can_enter: { type: 'boolean', nullable: true },
        materials: { type: 'string', nullable: true },
      },
      additionalProperties: false,
    },
  },
  additionalProperties: false,
} as any;

export interface deleteContestParams {
  where: Record<string, unknown> | Array<string | [any, any, any]>;
}

const deleteContestParamsSchema: JSONSchemaType<deleteContestParams> = {
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

export { createContestParamsSchema, readContestParamsSchema, updateContestParamsSchema, deleteContestParamsSchema };
