import * as Hapi from "hapi";
import * as mongoose from "mongoose";
import "reflect-metadata";
import { iocRegister, LoadPlugins, serverConfig } from "./config";

async function startServer(): Promise<any> {
    const server = new Hapi.Server({
        debug: { request: ["error"] },
        port: serverConfig.port,
        routes: {
            cors: {
                origin: ["*"]
            }
        }
    });

    iocRegister(server);
    LoadPlugins(server);

    (mongoose as any).Promise = Promise;
    await mongoose.connect(serverConfig.databaseURL, { useNewUrlParser: true, useFindAndModify: false });
    console.log("database connection -- OK");

    await server.start();
    console.log("Server running at:", server.info.uri);
}

startServer();
