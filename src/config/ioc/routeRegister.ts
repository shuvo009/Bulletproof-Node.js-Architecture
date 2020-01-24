import * as Hapi from "@hapi/hapi";
import { Container } from "inversify";
import { AuthController, ProductController } from "../../apiRoute";
import { IControllerRegister } from "../../interfaces";

export function routerRegister(server: Hapi.Server, container: Container) {
    const routers: IControllerRegister[] = [
        new AuthController(),
        new ProductController()
    ];
    routers.forEach((router: IControllerRegister) => {
        router.register(server, container);
    });
}
