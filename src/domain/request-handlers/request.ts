import { RequestHandlerNetworkError } from "./request-handler-network-error";

export namespace Request {
  export class Success<T = any> {
    constructor(public readonly value?: T) {}
  }

  export class Fail extends Error {
    constructor(error?: RequestHandlerNetworkError | Error) {
      let errorMessage = "";

      if (process.env.NODE_ENV === "development") {
        // eslint-disable-next-line no-console
        console.log(error);
      }

      if (error) {
        if (error instanceof Error) {
          errorMessage = `NO NETWORK ERROR: ${error.message}`;
        } else {
          errorMessage = `${error.status}: ${error.message}`;
        }

        console.error(errorMessage);
      }

      super(errorMessage);
    }
  }

  export class NotFound extends Error {
    constructor(error: RequestHandlerNetworkError) {
      const errorMessage = `${error.status}: ${error.message}`;

      if (process.env.NODE_ENV === "development") {
        // eslint-disable-next-line no-console
        console.log(error);
      }

      super(errorMessage);
    }
  }

  export class Forbidden extends Error {
    constructor(error: RequestHandlerNetworkError) {
      const errorMessage = `${error.status}: ${error.message}`;

      if (process.env.NODE_ENV === "development") {
        // eslint-disable-next-line no-console
        console.log(error);
      }

      super(errorMessage);
    }
  }

  export class Cancelled {}

  export type Payload<T> = { hasError: boolean; value: null | T };
}
