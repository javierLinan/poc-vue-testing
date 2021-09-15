import { Inject, injectable } from "inversify-props";
import { TYPES } from "../../types";
import { ConfigRepository } from "../../domain/repositories/config-repository";
import { RequestHandler } from "../../domain/request-handlers/request-handler";
import { Request } from "../../domain/request-handlers/request";
import { Config } from "../../domain/model/config";

@injectable()
export class ConfigHttpRepository implements ConfigRepository {
  @Inject(TYPES.REQUEST_HANDLER)
  private requestHandler: RequestHandler;

  private config: Config = undefined;

  async getSelf() {
    let config = this.config;

    if (!config) {
      try {
        const response = await this.requestHandler.get<Config>(
          `/config.json?timestamp=${new Date().getTime()}` // We do not want browsers to cache config
        );

        config = response.data;
        this.config = config;
      } catch (error) {
        return new Request.Fail(error);
      }
    }

    return new Request.Success(config);
  }
}
