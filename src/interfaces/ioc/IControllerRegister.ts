import * as Hapi from "@hapi/hapi";
import { Container } from "inversify";

export interface IControllerRegister {
    register(server: Hapi.Server, container: Container): void;
}
