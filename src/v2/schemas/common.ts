import { JSONSchemaType } from 'ajv';

export type CustomWhere = Record<string, unknown> | Array<string | [any, any, any]>;

const customWhereSchema: JSONSchemaType<CustomWhere> = {
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

export { customWhereSchema };
