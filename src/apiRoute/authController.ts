import Boom from "@hapi/boom";
import * as Hapi from "@hapi/hapi";
import Joi from "@hapi/joi";
import { Container } from "inversify";
import { serviceTypes } from "../config";
import { IAccountService, IControllerRegister } from "../interfaces";
import { IAccountModel } from "../models";

export class AuthController implements IControllerRegister {
    private controllerName = "auth";

    public register(server: Hapi.Server, container: Container): void {
        const accountService: IAccountService = container.get<IAccountService>(serviceTypes.AccountService);

        server.route({
            handler: (request: any) => this.userLogin(request.payload, accountService),
            method: "POST",
            options: {
                auth: false,
                tags: ["api", this.controllerName],
                validate: {
                    payload: Joi.object({
                        password: Joi.string().required(),
                        username: Joi.string().required(),
                    })
                }
            },
            path: `/api/${this.controllerName}/login`
        });

        server.route({
            handler: (request: any) => this.useRegister(request.payload, accountService),
            method: "POST",
            options: {
                auth: false,
                tags: ["api", this.controllerName],
                validate: {
                    payload: Joi.object({
                        name: Joi.string().required(),
                        password: Joi.string().required(),
                        username: Joi.string().required(),
                    }),
                },
            },
            path: `/api/${this.controllerName}/register`
        });
    }

    /* #region  Handelars */

    private async userLogin(payload: any, accountService: IAccountService): Promise<any> {
        try {
            const result = await accountService.login(payload.username, payload.password);
            return result;
        } catch (e) {
            return Boom.badRequest(e);
        }
    }

    private async useRegister(userAccount: IAccountModel, accountService: IAccountService): Promise<any> {
        try {
            await accountService.register(userAccount);
            return "";
        } catch (error) {
            return Boom.badRequest(error.message);
        }
    }

    /* #endregion */
}
