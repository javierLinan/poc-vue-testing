import { Dictionary } from "../model/dictiionary";
import { Todo } from "../model/todo";
import { Request } from "../request-handlers/request";
export interface TodoRepository {
  find(): Promise<Request.Success<Dictionary<Todo>> | Request.Fail>;
  findById(id: string): Promise<Request.Success<Todo> | Request.Fail>;
  create(
    text: string,
    done: boolean
  ): Promise<Request.Success<Todo> | Request.Fail>;
  update(todo: Todo): Promise<Request.Success<Todo> | Request.Fail>;
  remove(id: string): Promise<Request.Success<Dictionary<Todo>> | Request.Fail>;
  setTodos?(todos: Dictionary<Todo>): void;
}
