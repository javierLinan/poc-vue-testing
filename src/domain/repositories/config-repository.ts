import { Config } from "../model/config";
import { Request } from "../request-handlers/request";

export interface ConfigRepository {
  getSelf(): Promise<Request.Success<Config> | Request.Fail>;
  setConfig?(config: Config): void;
}
