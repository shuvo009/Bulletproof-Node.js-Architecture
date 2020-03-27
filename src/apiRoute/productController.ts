import * as Hapi from "@hapi/hapi";
import Joi from "@hapi/joi";
import { Container } from "inversify";
import { serviceTypes } from "../config";
import { IControllerRegister, IProductService } from "../interfaces";
import { IProductModel } from "../models";
import { BaseController } from "./baseController";

export class ProductController extends BaseController<IProductModel> implements IControllerRegister {
    
    public register(server: Hapi.Server, container: Container): void {
        const productService: IProductService = container.get<IProductService>(serviceTypes.ProductService);
        this.initBaseRoutes(server, productService);
    }

    /* #region  Base Class Methods */
    public getModelPayloadValidator(): any {
        return {
            name: Joi.string().required(),
            price: Joi.string().required(),
            quantity: Joi.string().required(),
        };
    }
    
    public getModelQueryValidator() {
        return {
            keyword: Joi.string().allow(""),
            page: Joi.number().integer(),
        };
    }

    public get controllerName(): string {
        return "product";
    }
    /* #endregion */
}
