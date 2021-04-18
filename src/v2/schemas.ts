export interface RequestBodySchema {
  offset: number;
  limit: number;
  where: Object;
  values: Array<Object>;
}

export interface ResponseBodySchema {
  error: number;
  error_msg?: string;
  data?: {
    total: number;
    items: Array<Object>;
  };
}
