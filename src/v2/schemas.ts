export interface RequestBodySchema {
  offset: number;
  limit: number;
  where: Record<string, unknown>;
  values: Array<Record<string, unknown>>;
}

export interface ResponseBodySchema {
  error: number;
  error_msg?: string;
  data?: {
    total: number;
    items: Array<Record<string, unknown>>;
  };
}
