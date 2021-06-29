import Ajv, { JSONSchemaType, ValidateFunction } from 'ajv';
import { ERROR_CODE, GeneralError } from '../errors';

const ajv = new Ajv();

const validators = new WeakMap<Record<string, unknown>, ValidateFunction>();

export function assertWithSchema<T>(value: unknown, schema: JSONSchemaType<T>): T {
  if (!validators.has(schema)) {
    validators.set(schema, ajv.compile(schema));
  }
  const validate = validators.get(schema) as ValidateFunction<T>;

  if (validate(value)) {
    return value;
  } else {
    throw new GeneralError({
      error: ERROR_CODE.JSON_SCHEMA_VALIDATION_FAILED,
      error_msg: 'JSON schema validation failed',
      data: {
        message: ajv.errorsText(validate.errors),
        errors: validate.errors,
      },
    });
  }
}
