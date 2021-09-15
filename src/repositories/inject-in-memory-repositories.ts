import { Container } from "@/container";
import { TYPES } from "@/types";
import { TodoRepository } from "@/domain/repositories/todo-repository";
import { TodoInMemoryRepository } from "@/repositories/todo/todo-in-memory-repository";
import { ConfigRepository } from "@/domain/repositories/config-repository";
import { ConfigInMemoryRepository } from "@/repositories/config/config-in-memory-repository";

export function injectInMemoryRepositories() {
  const container = Container.instance();

  container.unbind(TYPES.TODO_REPOSITORY);

  container
    .bind<TodoRepository>(TYPES.TODO_REPOSITORY)
    .to(TodoInMemoryRepository)
    .inSingletonScope();

  container.unbind(TYPES.CONFIG_REPOSITORY);

  container
    .bind<ConfigRepository>(TYPES.CONFIG_REPOSITORY)
    .to(ConfigInMemoryRepository)
    .inSingletonScope();
}
