export type Method =
  | "get"
  | "GET"
  | "delete"
  | "DELETE"
  | "options"
  | "OPTIONS"
  | "post"
  | "POST"
  | "put"
  | "PUT"
  | "patch"
  | "PATCH";

export interface RequestHandlerConfig {
  url?: string;
  method?: Method;
  baseURL?: string;
  headers?: any;
  params?: any;
  data?: any;
}
