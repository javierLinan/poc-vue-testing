import { getTodoRepository } from "./get-todo-repository";
import { getConfigRepository } from "./get-config-repository";

export function initRepositoriesWithData(data: { [key: string]: any } = {}) {
  getConfigRepository().setConfig(data.config);
  getTodoRepository().setTodos(data.todos);
}
