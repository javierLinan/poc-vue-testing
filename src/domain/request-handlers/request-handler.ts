import { RequestHandlerConfig } from "./request-handler-config";
import { RequestHandlerResponse } from "./request-handler-response";

export interface RequestHandler {
  requestIsCancelled(thrown: any): boolean;
  cancelAndGet<T>(
    url: string,
    config?: RequestHandlerConfig
  ): Promise<RequestHandlerResponse<T>>;
  get<T>(
    url: string,
    config?: RequestHandlerConfig
  ): Promise<RequestHandlerResponse<T>>;
  delete<T>(
    url: string,
    config?: RequestHandlerConfig
  ): Promise<RequestHandlerResponse<T>>;
  post<T>(
    url: string,
    data?: any,
    config?: RequestHandlerConfig
  ): Promise<RequestHandlerResponse<T>>;
  put<T>(
    url: string,
    data?: any,
    config?: RequestHandlerConfig
  ): Promise<RequestHandlerResponse<T>>;
  patch<T>(
    url: string,
    data?: any,
    config?: RequestHandlerConfig
  ): Promise<RequestHandlerResponse<T>>;
}
