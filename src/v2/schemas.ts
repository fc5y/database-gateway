export interface RequestBodySchema {
  offset: number;
  limit: number;
  where: Record<string, unknown> | Array<string | [any, any, any]>;
  values: Record<string, unknown>;
  order_by: Array<string>;
  has_total: boolean;
}

export interface ResponseBodySchema {
  error: number;
  error_msg: string;
  data?: {
    total: number;
    items: Array<Record<string, unknown>>;
  };
}
