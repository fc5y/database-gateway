export interface RequestBodySchema {
  offset: number;
  limit: number;
  where: Array<Object>;
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
