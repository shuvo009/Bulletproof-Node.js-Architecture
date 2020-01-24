import * as Hapi from "@hapi/hapi";
import { Container } from "inversify";
import { IServiceRegister } from "../../interfaces";
import { RepositoryRegister } from "./repositoryRegister";
import { routerRegister } from "./routeRegister";
import { ServiceRegister } from "./serviceRegister";

export function iocRegister(server: Hapi.Server) {
    const container = new Container({ skipBaseClassChecks: true });
    const registerList: IServiceRegister[] =
        [
            new RepositoryRegister(),
            new ServiceRegister()
        ];

    registerList.forEach((serviceRegister) => {
        serviceRegister.register(container);
    });

    routerRegister(server, container);
}
