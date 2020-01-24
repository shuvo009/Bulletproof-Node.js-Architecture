import * as Hapi from "@hapi/hapi";
import { Container } from "inversify";
import { repositoryTypes, serverConfig } from "../../../config";
import { IAccountRepository, IPlugin } from "../../../interfaces";
const register = async (container: Container, server: Hapi.Server): Promise<void> => {
    try {
        const validateUser = async (decoded: any, request: Hapi.Request, h: Hapi.ResponseToolkit) => {
            const accountRepository = container.get<IAccountRepository>(repositoryTypes.AccountRepository);
            const user = await accountRepository.findById(decoded.id);
            if (!user) {
                return { isValid: false };
            }
            return { isValid: true };
        };

        await server.register(require("hapi-auth-jwt2"));
        return setAuthStrategy(server, { validate: validateUser });
    } catch (err) {
        console.log(`Error registering jwt plugin: ${err}`);
        throw err;
    }
};

const setAuthStrategy = async (server: any, { validate }: any) => {
    server.auth.strategy("jwt", "jwt", {
        key: serverConfig.jwtSecret,
        validate,
        verifyOptions: {
            algorithms: ["HS256"]
        }
    });
    server.auth.default("jwt");
    return;
};

export default (): IPlugin => {
    return {
        info: () => {
            return { name: "JWT Authentication", version: "1.0.0" };
        },
        register
    };
};
