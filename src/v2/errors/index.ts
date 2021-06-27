export const ERROR_CODE = {
  JSON_SCHEMA_VALIDATION_FAILED: 400001,
  BAD_WHERE_CLAUSE: 400002,
  SQL_ERROR: 400003,
  UNKNOWN_ERROR: 499999,
};

export class GeneralError extends Error {
  error: number;
  error_msg: string;
  data: any;

  constructor({ error, error_msg, data }: { error: number; error_msg: string; data: any }) {
    super(JSON.stringify({ error, error_msg, data }));
    this.error = error;
    this.error_msg = error_msg;
    this.data = data;
    this.name = 'GeneralError';
  }
}
