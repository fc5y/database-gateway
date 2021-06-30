import { JSONSchemaType } from 'ajv';
import { WhereClause, OrderByClause, whereClauseSchema, orderByClauseSchema } from './common';

export interface createParticipationParams {
  values: {
    user_id: number;
    contest_id: number;
    rank_in_contest: number;
    rating: number;
    rating_change: number;
    score: number;
    is_hidden: boolean;
    contest_password: string;
    synced: boolean;
  };
}

const createParticipationParamsSchema: JSONSchemaType<createParticipationParams> = {
  type: 'object',
  required: ['values'],
  properties: {
    values: {
      type: 'object',
      required: [
        'user_id',
        'contest_id',
        'rank_in_contest',
        'rating',
        'rating_change',
        'score',
        'is_hidden',
        'contest_password',
        'synced',
      ],
      properties: {
        user_id: { type: 'integer' },
        contest_id: { type: 'integer' },
        rank_in_contest: { type: 'integer' },
        rating: { type: 'integer' },
        rating_change: { type: 'integer' },
        score: { type: 'integer' },
        is_hidden: { type: 'boolean' },
        contest_password: { type: 'string' },
        synced: { type: 'boolean' },
      },
      additionalProperties: false,
    },
  },
};

export interface readParticipationParams {
  offset: number;
  limit: number;
  has_total?: boolean;
  order_by?: OrderByClause;
  where?: WhereClause;
}

const readParticipationParamsSchema: JSONSchemaType<readParticipationParams> = {
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

export interface updateParticipationParams {
  where: WhereClause;
  values: {
    user_id?: number;
    contest_id?: number;
    rank_in_contest?: number;
    rating?: number;
    rating_change?: number;
    score?: number;
    is_hidden?: boolean;
    contest_password?: string;
    synced?: boolean;
  };
}

const updateParticipationParamsSchema: JSONSchemaType<updateParticipationParams> = {
  type: 'object',
  required: ['values', 'where'],
  properties: {
    where: whereClauseSchema,
    values: {
      type: 'object',
      required: [],
      properties: {
        user_id: { type: 'integer', nullable: true },
        contest_id: { type: 'integer', nullable: true },
        rank_in_contest: { type: 'integer', nullable: true },
        rating: { type: 'integer', nullable: true },
        rating_change: { type: 'integer', nullable: true },
        score: { type: 'integer', nullable: true },
        is_hidden: { type: 'boolean', nullable: true },
        contest_password: { type: 'string', nullable: true },
        synced: { type: 'boolean', nullable: true },
      },
      additionalProperties: false,
    },
  },
} as any;

export interface deleteParticipationParams {
  where: WhereClause;
}

const deleteParticipationParamsSchema: JSONSchemaType<deleteParticipationParams> = {
  type: 'object',
  required: ['where'],
  properties: {
    where: whereClauseSchema,
  },
} as any;

export {
  createParticipationParamsSchema,
  readParticipationParamsSchema,
  updateParticipationParamsSchema,
  deleteParticipationParamsSchema,
};
