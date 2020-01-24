import * as Hapi from "@hapi/hapi";
import { IPlugin } from "../../../interfaces";

const register = async (server: Hapi.Server): Promise<void> => {
    try {
        return server.register([
            require("@hapi/inert"),
            require("@hapi/vision"),
            {
                options: {
                    documentationPage: true,
                    documentationPath: "/docs",
                    info: {
                        description: "Task Api Documentation",
                        title: "Task Api",
                        version: "1.0"
                    },
                    swaggerUI: true,
                    tags: [
                        {
                            description: "Api tasks interface.",
                            name: "tasks"
                        },
                        {
                            description: "Api users interface.",
                            name: "users"
                        }
                    ],
                },
                plugin: require("hapi-swagger"),
            }
        ]);
    } catch (err) {
        console.log(`Error registering swagger plugin: ${err}`);
    }
};

export default (): IPlugin => {
    return {
        info: () => {
            return { name: "Swagger Documentation", version: "1.0.0" };
        },
        register
    };
};
