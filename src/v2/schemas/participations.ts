import { JSONSchemaType } from 'ajv';
import { CustomWhere, customWhereSchema } from './common';

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
  order_by?: Array<string>;
  where?: CustomWhere;
}

const readParticipationParamsSchema: JSONSchemaType<readParticipationParams> = {
  type: 'object',
  required: ['offset', 'limit'],
  properties: {
    offset: { type: 'integer' },
    limit: { type: 'integer' },
    has_total: { type: 'boolean', nullable: true },
    order_by: { type: 'array', nullable: true, items: { type: 'string' } },
    where: customWhereSchema,
  },
} as any;

export interface updateParticipationParams {
  where: CustomWhere;
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
    where: customWhereSchema,
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
  where: CustomWhere;
}

const deleteParticipationParamsSchema: JSONSchemaType<deleteParticipationParams> = {
  type: 'object',
  required: ['where'],
  properties: {
    where: customWhereSchema,
  },
} as any;

export {
  createParticipationParamsSchema,
  readParticipationParamsSchema,
  updateParticipationParamsSchema,
  deleteParticipationParamsSchema,
};
