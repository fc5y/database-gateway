import { JSONSchemaType } from 'ajv';
import { WhereClause, OrderByClause, whereClauseSchema, orderByClauseSchema } from './common';

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
};

export interface readContestParams {
  offset: number;
  limit: number;
  has_total?: boolean;
  order_by?: OrderByClause;
  where?: WhereClause;
}

const readContestParamsSchema: JSONSchemaType<readContestParams> = {
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

export interface updateContestParams {
  where: WhereClause;
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
    where: whereClauseSchema,
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
} as any;

export interface deleteContestParams {
  where: WhereClause;
}

const deleteContestParamsSchema: JSONSchemaType<deleteContestParams> = {
  type: 'object',
  required: ['where'],
  properties: {
    where: whereClauseSchema,
  },
} as any;

export { createContestParamsSchema, readContestParamsSchema, updateContestParamsSchema, deleteContestParamsSchema };
