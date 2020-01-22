import * as Hapi from "hapi";
import { IPluginInfo } from "./IPluginInfo";

export interface IPlugin {
    register(server: Hapi.Server): Promise<void>;
    info(): IPluginInfo;
}