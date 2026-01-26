import type { SystemConfig } from "../entities/SystemConfig";

export interface IConfigRepository {
    getConfig(): Promise<SystemConfig>;
}
