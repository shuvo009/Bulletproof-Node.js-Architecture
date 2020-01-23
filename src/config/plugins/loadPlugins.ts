import * as fs from "fs";
import * as Hapi from "hapi";
import * as path from "path";
import { IPlugin } from "../../interfaces";

export function LoadPlugins(server: Hapi.Server): Promise<any> {
    const pluginPromises: Array<Promise<any>> = [];

    const pluginsPath = __dirname + "/plugins/";
    const plugins = fs.readdirSync(pluginsPath)
    .filter((file) => fs.statSync(path.join(pluginsPath, file)).isDirectory());
    plugins.forEach((pluginName: string) => {
        const plugin: IPlugin = (require("./plugins/" + pluginName)).default();
        console.log(`Register Plugin ${plugin.info().name} v${plugin.info().version}`);
        pluginPromises.push(plugin.register(server));
    });

    return Promise.all(pluginPromises);
}
