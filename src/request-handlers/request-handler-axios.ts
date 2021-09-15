import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  CancelTokenSource,
} from "axios";
import { injectable } from "inversify-props";
import { RequestHandler } from "../domain/request-handlers/request-handler";
import { RequestHandlerNetworkError } from "../domain/request-handlers/request-handler-network-error";

@injectable()
export class RequestHandlerAxios implements RequestHandler {
  private readonly httpSingleton: AxiosInstance;

  private readonly pendingRequests: Map<string, CancelTokenSource>;

  constructor() {
    this.httpSingleton = axios.create({ withCredentials: true });
    this.pendingRequests = new Map();
    this.httpSingleton.interceptors.response.use(
      (response) => response,
      (error: AxiosError<{ status: string; message: string }>) => {
        if (this.requestIsCancelled(error) || !error.response) {
          return Promise.reject(error);
        } else {
          const responseData = error.response.data;
          const status = responseData.status || `${error.response.status}`;
          const message = responseData.message || error.response.statusText;

          const networkError: RequestHandlerNetworkError = {
            status,
            message,
          };

          return Promise.reject(networkError);
        }
      }
    );
  }

  requestIsCancelled(thrown: any) {
    return axios.isCancel(thrown);
  }

  async cancelAndGet<T>(url: string, config?: AxiosRequestConfig) {
    if (this.pendingRequests.has(url)) {
      this.pendingRequests.get(url).cancel();
    }
    const cancelTokenSource = axios.CancelToken.source();
    this.pendingRequests.set(url, cancelTokenSource);
    config.cancelToken = cancelTokenSource.token;
    return this.httpSingleton.get<T>(url, config);
  }

  async get<T>(url: string, config?: AxiosRequestConfig) {
    return this.httpSingleton.get<T>(url, config);
  }

  async delete<T>(url: string, config?: AxiosRequestConfig) {
    return this.httpSingleton.delete<T>(url, config);
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.httpSingleton.post<T>(url, data, config);
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.httpSingleton.put<T>(url, data, config);
  }

  async patch<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.httpSingleton.patch<T>(url, data, config);
  }
}
