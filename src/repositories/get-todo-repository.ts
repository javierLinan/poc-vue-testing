import { Container } from "@/container";
import { TYPES } from "@/types";
import { TodoRepository } from "../domain/repositories/todo-repository";

export function getTodoRepository(): TodoRepository {
  return Container.instance().get(TYPES.TODO_REPOSITORY);
}
