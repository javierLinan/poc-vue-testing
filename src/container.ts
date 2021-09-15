import { TYPES } from "./types";
import { interfaces } from "inversify";
import { container } from "inversify-props";
import { TodoRepository } from "./domain/repositories/todo-repository";
import { TodoHttpRepository } from "./repositories/todo/todo-http-repository";
import { ConfigRepository } from "./domain/repositories/config-repository";
import { RequestHandler } from "./domain/request-handlers/request-handler";
import { RequestHandlerAxios } from "./request-handlers/request-handler-axios";
import { ConfigHttpRepository } from "./repositories/config/config-http-repository";

export class Container {
  private static _instance: Container | null = null;
  private readonly _container: interfaces.Container;

  private constructor() {
    container
      .bind<TodoRepository>(TYPES.TODO_REPOSITORY)
      .to(TodoHttpRepository)
      .inSingletonScope();
    container
      .bind<ConfigRepository>(TYPES.CONFIG_REPOSITORY)
      .to(ConfigHttpRepository)
      .inSingletonScope();
    container
      .bind<RequestHandler>(TYPES.REQUEST_HANDLER)
      .to(RequestHandlerAxios)
      .inSingletonScope();

    this._container = container;
  }

  static instance() {
    if (this._instance === null) {
      Container._instance = new Container();
    }

    return this._instance!._container;
  }
}
