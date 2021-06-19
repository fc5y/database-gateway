import { Request, Response, NextFunction } from 'express';

function isObject(val: any): boolean {
  return val.constructor === Object;
}

function isNumber(val: any): boolean {
  return !isNaN(parseFloat(val)) && isFinite(val);
}

function isBoolean(val: any): boolean {
  return val === 'false' || val === 'true';
}

function isArray(val: any): boolean {
  return Array.isArray(val);
}

function parseValue(val: any): any {
  if (typeof val == 'undefined' || val == '') {
    return null;
  } else if (isBoolean(val)) {
    return parseBoolean(val);
  } else if (isArray(val)) {
    return parseArray(val);
  } else if (isObject(val)) {
    return parseObject(val);
  } else if (isNumber(val)) {
    return parseNumber(val);
  } else {
    return val;
  }
}

function parseObject(obj: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const key in obj) {
    const val = parseValue(obj[key]);
    if (val !== null) {
      result[key] = val;
    }
  }
  return result;
}

function parseArray<T>(arr: T[]) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    result[i] = parseValue(arr[i]);
  }
  return result;
}

function parseNumber(val: any) {
  return Number(val);
}

function parseBoolean(val: any) {
  return val === 'true';
}

function parseQueryString(req: Request, res: Response, next: NextFunction): void {
  req.body = parseObject(req.query);
  return next();
}

export default parseQueryString;
