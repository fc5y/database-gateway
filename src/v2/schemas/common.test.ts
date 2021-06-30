import { whereClauseSchema, orderByClauseSchema } from './common';
import { GeneralError } from '../errors';
import { assertWithSchema } from '../validation';

describe('whereClauseSchema', () => {
  it('should not pass for invalid where clause', () => {
    const where_not_object_or_array = 'id=1';
    const where_invalid_array_1 = [['id=1']];
    const where_invalid_array_2 = [['id', '1']];
    const where_invalid_array_3 = [['id', '<', '=', '1']];
    const where_invalid_array_4 = [1];

    expect(() => assertWithSchema(where_not_object_or_array, whereClauseSchema)).toThrow(GeneralError);
    expect(() => assertWithSchema(where_invalid_array_1, whereClauseSchema)).toThrow(GeneralError);
    expect(() => assertWithSchema(where_invalid_array_2, whereClauseSchema)).toThrow(GeneralError);
    expect(() => assertWithSchema(where_invalid_array_3, whereClauseSchema)).toThrow(GeneralError);
    expect(() => assertWithSchema(where_invalid_array_4, whereClauseSchema)).toThrow(GeneralError);
  });

  it('should pass for valid where clause', () => {
    const where_object = { id: 1 };
    const where_array = [['id', '<', 999], 'contest_title="Test Contest"'];

    expect(() => assertWithSchema(where_object, whereClauseSchema)).not.toThrow();
    expect(() => assertWithSchema(where_array, whereClauseSchema)).not.toThrow();
  });
});

describe('orderByClauseSchema', () => {
  it('should not pass for invalid order_by clause', () => {
    const order_by_not_array = 'start_time';
    const order_by_invalid_order = [{ column: 'start_time', order: 'dsc' }];

    expect(() => assertWithSchema(order_by_not_array, orderByClauseSchema)).toThrow(GeneralError);
    expect(() => assertWithSchema(order_by_invalid_order, orderByClauseSchema)).toThrow(GeneralError);
  });

  it('should pass for valid order_by clause', () => {
    const order_by = [{ column: 'start_time', order: 'desc' }, 'duration'];

    expect(() => assertWithSchema(order_by, orderByClauseSchema)).not.toThrow();
  });
});
