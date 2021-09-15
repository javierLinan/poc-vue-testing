import { injectable } from "inversify-props";
import { ConfigRepository } from "../../domain/repositories/config-repository";
import { Config } from "../../domain/model/config";
import { Request } from "../../domain/request-handlers/request";

@injectable()
export class ConfigInMemoryRepository implements ConfigRepository {
  private config: Config = undefined;

  public async getSelf() {
    const config = this.config;

    if (!config) {
      return new Request.Fail();
    }

    return new Request.Success(config);
  }

  public setConfig(config: Config) {
    this.config = config;
  }
}
