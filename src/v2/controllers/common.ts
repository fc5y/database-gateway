import { Knex } from 'knex/types/index';
import { ERROR_CODE, GeneralError } from '../errors';
import { WhereClause, OrderByClause } from '../schemas/common';

export function applyWhere(query: Knex.QueryBuilder, where: WhereClause): Knex.QueryBuilder {
  if (Array.isArray(where)) {
    for (const value of where) {
      if (typeof value === 'string') {
        query.whereRaw(value, []);
      } else if (Array.isArray(value) && value.length === 3) {
        query.where(value[0], value[1], value[2]);
      } else {
        throw new GeneralError({
          error: ERROR_CODE.BAD_WHERE_CLAUSE,
          error_msg: "where's element must be a string or an array of length 3",
          data: null,
        });
      }
    }
  } else if (typeof where === 'object' && where !== null) {
    query.where(where);
  } else {
    throw new GeneralError({
      error: ERROR_CODE.BAD_WHERE_CLAUSE,
      error_msg: 'where must be an array or an object',
      data: null,
    });
  }

  return query;
}

export function applyOrderBy(query: Knex.QueryBuilder, order_by: OrderByClause): Knex.QueryBuilder {
  if (!Array.isArray(order_by)) {
    throw new GeneralError({
      error: ERROR_CODE.BAD_ORDER_BY_CLAUSE,
      error_msg: 'order_by must be an array',
      data: null,
    });
  }
  for (const value of order_by) {
    if (typeof value === 'string') {
      query.orderBy(value);
    } else if (typeof value === 'object' && value !== null && 'column' in value && 'order' in value) {
      query.orderBy(value.column, value.order);
    } else {
      throw new GeneralError({
        error: ERROR_CODE.BAD_ORDER_BY_CLAUSE,
        error_msg: "order_by's element must be a string or an object with properties column and order",
        data: null,
      });
    }
  }

  return query;
}
