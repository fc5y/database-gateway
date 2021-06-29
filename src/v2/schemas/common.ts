import { JSONSchemaType } from 'ajv';

export type WhereClause = Record<string, unknown> | Array<string | [any, any, any]>;
export type OrderByClause = Array<string | { column: string; order: 'asc' | 'desc' }>;

const whereClauseSchema: JSONSchemaType<WhereClause> = {
  anyOf: [
    {
      type: 'object',
      required: [],
    },
    {
      type: 'array',
      items: {
        anyOf: [
          {
            type: 'string',
            minLength: 1,
          },
          {
            type: 'array',
            items: [{}, {}, {}],
            minItems: 3,
            maxItems: 3,
          },
        ],
      },
    },
  ],
} as any;

const orderByClauseSchema: JSONSchemaType<OrderByClause> = {
  type: 'array',
  items: {
    anyOf: [
      {
        type: 'string',
        minLength: 1,
      },
      {
        type: 'object',
        required: ['column', 'order'],
        properties: {
          column: { type: 'string', minLength: 1 },
          order: { type: 'string', enum: ['asc', 'desc'] },
        },
        additionalProperties: false,
      },
    ],
  },
};

export { whereClauseSchema, orderByClauseSchema };
