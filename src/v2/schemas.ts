export interface RequestBodySchema {
  offset: number;
  limit: number;
  where: Record<string, unknown> | Array<Array<any>> | Array<string>;
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
