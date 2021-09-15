import { Container } from "@/container";
import { TYPES } from "@/types";
import { ConfigRepository } from "../domain/repositories/config-repository";

export function getConfigRepository(): ConfigRepository {
  return Container.instance().get(TYPES.CONFIG_REPOSITORY);
}
