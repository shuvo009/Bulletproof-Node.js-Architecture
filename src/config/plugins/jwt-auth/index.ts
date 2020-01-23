import * as Hapi from "hapi";
import { serverConstants } from "../../../config";
import { IPlugin } from "../../../interfaces";
const register = async (server: Hapi.Server): Promise<void> => {
    try {
        const validateUser = async (decoded: any, request: Hapi.Request, h: Hapi.ResponseToolkit) => {
            //            const user = await database.userModel.findById(decoded.id).lean(true);
            //            if (!user) {
            //                return { isValid: false };
            //            }

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
        key: serverConstants.jwtSecret,
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
