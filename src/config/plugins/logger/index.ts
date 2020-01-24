import * as Hapi from "@hapi/hapi";
import { Container } from "inversify";
import { IPlugin } from "../../../interfaces";

const register = async (container: Container, server: Hapi.Server): Promise<void> => {
    try {
        return server.register({
            options: {
                ops: {
                    interval: 1000
                },
                reporters: {
                    consoleReporter: [
                        {
                            args: [
                                {
                                    error: "*",
                                    log: "*",
                                    request: "*",
                                    response: "*",
                                }
                            ],
                            module: "good-squeeze",
                            name: "Squeeze",
                        },
                        {
                            module: "good-console"
                        },
                        "stdout"
                    ]
                }
            },
            plugin: require("good"),
        });
    } catch (err) {
        console.log(`Error registering logger plugin: ${err}`);
        throw err;
    }
};

export default (): IPlugin => {
    return {
        info: () => {
            return { name: "Good Logger", version: "1.0.0" };
        },
        register
    };
};
