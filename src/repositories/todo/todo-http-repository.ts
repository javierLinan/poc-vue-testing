import { Inject, injectable } from "inversify-props";
import { TodoRepository } from "../../domain/repositories/todo-repository";
import { TYPES } from "../../types";
import { ConfigRepository } from "../../domain/repositories/config-repository";
import { RequestHandler } from "../../domain/request-handlers/request-handler";
import { Request } from "../../domain/request-handlers/request";
import { Dictionary } from "../../domain/model/dictiionary";
import { Todo } from "../../domain/model/todo";

@injectable()
export class TodoHttpRepository implements TodoRepository {
  @Inject(TYPES.CONFIG_REPOSITORY)
  private configRepository: ConfigRepository;

  @Inject(TYPES.REQUEST_HANDLER)
  private requestHandler: RequestHandler;

  async find() {
    try {
      const backendUrl = await this.getBackendUrl();
      const response = await this.requestHandler.get<Dictionary<Todo>>(
        `${backendUrl}/todos`
      );
      return new Request.Success(response.data);
    } catch (error) {
      return new Request.Fail();
    }
  }

  async findById(id: string) {
    try {
      const backendUrl = await this.getBackendUrl();
      const response = await this.requestHandler.get<Todo>(
        `${backendUrl}/todos/${id}`
      );
      return new Request.Success(response.data);
    } catch (error) {
      return new Request.Fail();
    }
  }

  async create(text: string, done: boolean) {
    try {
      const backendUrl = await this.getBackendUrl();
      const response = await this.requestHandler.post<Todo>(
        `${backendUrl}/todos`,
        { text, done }
      );
      return new Request.Success(response.data);
    } catch (error) {
      return new Request.Fail();
    }
  }

  async update(updatedTodo: Todo) {
    try {
      const { id, text, done } = updatedTodo;
      const backendUrl = await this.getBackendUrl();
      const response = await this.requestHandler.patch<Todo>(
        `${backendUrl}/todos/${id}`,
        { text, done }
      );
      return new Request.Success(response.data);
    } catch (error) {
      return new Request.Fail();
    }
  }

  async remove(id: string) {
    try {
      const backendUrl = await this.getBackendUrl();
      const response = await this.requestHandler.delete(
        `${backendUrl}/todos/${id}`
      );
      return new Request.Success();
    } catch (error) {
      return new Request.Fail();
    }
  }

  private async getBackendUrl() {
    const response = this.configRepository.getSelf();

    if (response instanceof Request.Success) {
      return response.value;
    }
  }
}
