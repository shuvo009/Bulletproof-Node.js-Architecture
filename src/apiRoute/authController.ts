import * as Boom from "boom";
import * as Hapi from "hapi";
import { Container } from "inversify";
import * as Joi from "joi";
import { serviceTypes } from "../config";
import { IControllerRegister } from "../interfaces";
import { IAccountService } from "../interfaces";
export class AuthController implements IControllerRegister {
    private controllerName = "auth";

    public register(server: Hapi.Server, container: Container): void {
        const accountService: IAccountService = container.get<IAccountService>(serviceTypes.AccountService);

        server.route({
            handler: async (request: any, h) => {
                try {
                    return await accountService.login(request.payload.username, request.payload.password);
                } catch (e) {
                    return Boom.badRequest(e);
                }
            },
            method: "POST",
            options: {
                auth: false,
                validate: {
                    payload: {
                        password: Joi.string().required(),
                        username: Joi.string().required(),
                    }
                }
            },
            path: `/api/${this.controllerName}/login`
        });
    }
}
