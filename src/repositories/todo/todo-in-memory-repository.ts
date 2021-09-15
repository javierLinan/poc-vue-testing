import { injectable } from "inversify-props";
import { TodoRepository } from "../../domain/repositories/todo-repository";
import { Request } from "../../domain/request-handlers/request";
import { Dictionary } from "../../domain/model/dictiionary";
import { Todo } from "../../domain/model/todo";
import { v4 as uuidv4 } from "uuid";

@injectable()
export class TodoInMemoryRepository implements TodoRepository {
  public todos: Dictionary<Todo>;

  async find() {
    return new Request.Success(this.todos);
  }

  async findById(id: string) {
    const todo = this.todos[id];
    if (todo) {
      return new Request.Success(todo);
    }

    return new Request.Fail();
  }

  async create(text: string, done: boolean) {
    const todo = {
      id: uuidv4(),
      text,
      done,
    };

    this.todos[todo.id] = todo;

    return new Request.Success(todo);
  }

  async update(updatedTodo: Todo) {
    const { id, text, done } = updatedTodo;
    let todo = this.todos[id];

    if (todo) {
      todo = { ...todo, text, done };
      this.todos[todo.id] = todo;
      return new Request.Success(todo);
    }

    return new Request.Fail();
  }

  async remove(id: string) {
    const todo = this.todos[id];

    if (todo) {
      const { [id]: todoToRemove, ...todos } = this.todos;

      this.todos = todos;
      return new Request.Success(todos);
    }

    return new Request.Fail();
  }

  public setTodos(todos: Dictionary<Todo> = {}) {
    this.todos = todos;
  }
}
