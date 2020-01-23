import * as Hapi from "hapi";
import { IBaseService } from "../interfaces";
import { IBaseModel } from "../models";

export abstract class BaseController<T extends IBaseModel> {
    constructor(public controllerName: string) {

    }

    public initBaseRoutes(server: Hapi.Server, baseService: IBaseService<T>): void {
        server.route({
            handler: (request: Hapi.Server) => {
                return "Hello World!2";
            },
            method: "GET",
            path: `/api/${this.controllerName}/getall`
        });
    }

    /* #region  Handelars */
    private async list() {

    }

    private async create() {

    }

    private async update() {

    }

    private async delete() {

    }
    /* #endregion */
}
