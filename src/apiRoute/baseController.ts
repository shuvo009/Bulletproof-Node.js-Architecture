import * as Hapi from "hapi";

export abstract class BaseController {
    constructor(public controllerName: string) {

    }

    public initBaseRoutes(server: Hapi.Server): void {
        server.route({
            handler: (request, h) => {
                return "Hello World!2";
            },
            method: "GET",
            path: `/api/${this.controllerName}/getall`
        });
    }
}
