import { JSONSchemaType } from 'ajv';
import { CustomWhere, customWhereSchema } from './common';

export interface createAnnouncementParams {
  values: {
    announcement_name: string;
    announcement_title: string;
    announcement_description: string;
  };
}

const createAnnouncementParamsSchema: JSONSchemaType<createAnnouncementParams> = {
  type: 'object',
  required: ['values'],
  properties: {
    values: {
      type: 'object',
      required: ['announcement_name', 'announcement_title', 'announcement_description'],
      properties: {
        announcement_name: { type: 'string' },
        announcement_title: { type: 'string' },
        announcement_description: { type: 'string' },
      },
      additionalProperties: false,
    },
  },
  additionalProperties: false,
};

export interface readAnnouncementParams {
  offset: number;
  limit: number;
  has_total?: boolean;
  order_by?: Array<string>;
  where?: CustomWhere;
}

const readAnnouncementParamsSchema: JSONSchemaType<readAnnouncementParams> = {
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

export interface updateAnnouncementParams {
  where: CustomWhere;
  values: {
    announcement_name?: string;
    announcement_title?: string;
    announcement_description?: string;
  };
}

const updateAnnouncementParamsSchema: JSONSchemaType<updateAnnouncementParams> = {
  type: 'object',
  required: ['values', 'where'],
  properties: {
    where: customWhereSchema,
    values: {
      type: 'object',
      required: [],
      properties: {
        announcement_name: { type: 'string', nullable: true },
        announcement_title: { type: 'string', nullable: true },
        announcement_description: { type: 'string', nullable: true },
      },
      additionalProperties: false,
    },
  },
  additionalProperties: false,
} as any;

export interface deleteAnnouncementParams {
  where: CustomWhere;
}

const deleteAnnouncementParamsSchema: JSONSchemaType<deleteAnnouncementParams> = {
  type: 'object',
  required: ['where'],
  properties: {
    where: customWhereSchema,
  },
  additionalProperties: false,
} as any;

export {
  createAnnouncementParamsSchema,
  readAnnouncementParamsSchema,
  updateAnnouncementParamsSchema,
  deleteAnnouncementParamsSchema,
};
