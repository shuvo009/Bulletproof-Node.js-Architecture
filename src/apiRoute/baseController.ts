import Boom from "boom";
import * as Hapi from "hapi";
import { IBaseService } from "../interfaces";
import { IBaseModel } from "../models";

export abstract class BaseController<T extends IBaseModel> {
    constructor(public controllerName: string) {

    }

    public initBaseRoutes(server: Hapi.Server, baseService: IBaseService<T>): void {
        server.route({
            handler: (request: any) => this.get(request.query, baseService),
            method: "GET",
            path: `/api/${this.controllerName}`
        });

        server.route({
            handler: (request: any) => this.getById(request.params.id, baseService),
            method: "GET",
            path: `/api/${this.controllerName}/{id}`
        });

        server.route({
            handler: (request: any) => this.post(request.payload, baseService),
            method: "POST",
            path: `/api/${this.controllerName}`
        });

        server.route({
            handler: (request: any) => this.put(request.params.id, request.payload, baseService),
            method: "PUT",
            path: `/api/${this.controllerName}/{id}`
        });

        server.route({
            handler: (request: any) => this.delete(request.params.id, baseService),
            method: "DELETE",
            path: `/api/${this.controllerName}/{id}`
        });
    }

    /* #region  Handelars */
    private async get(query: any, baseService: IBaseService<T>): Promise<any> {
        try {
            const page = query.page || 1;
            delete query.page;
            const result = await baseService.getAll(query, page);
            return result;
        } catch (e) {
            return Boom.badRequest(e);
        }
    }

    private async getById(id: any, baseService: IBaseService<T>): Promise<any> {
        try {
            const result = await baseService.getById(id);
            return result;
        } catch (e) {
            return Boom.badRequest(e);
        }
    }

    private async post(model: T, baseService: IBaseService<T>): Promise<any> {
        try {
            const result = await baseService.create(model, undefined);
            return result;
        } catch (e) {
            return Boom.badRequest(e);
        }
    }

    private async put(id: any, model: T, baseService: IBaseService<T>): Promise<any> {
        try {
            const result = await baseService.update(id, model, undefined);
            return result;
        } catch (e) {
            return Boom.badRequest(e);
        }
    }

    private async delete(id: any, baseService: IBaseService<T>): Promise<any> {
        try {
            const result = await baseService.delete(id);
            return result;
        } catch (e) {
            return Boom.badRequest(e);
        }
    }
    /* #endregion */
}
