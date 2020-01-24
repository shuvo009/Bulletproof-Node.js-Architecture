import * as Hapi from "@hapi/hapi";
import { Container } from "inversify";
import { IPluginInfo } from "./IPluginInfo";

export interface IPlugin {
    register(container: Container, server: Hapi.Server): Promise<void>;
    info(): IPluginInfo;
}
