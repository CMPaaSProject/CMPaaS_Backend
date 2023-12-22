import Fastify from "fastify";
import autoload from "@fastify/autoload";
import { join } from 'path';

export const build = async (opts: object) => {
    const app = Fastify(opts);

    app.register(autoload, { dir: join(__dirname, "routes") });
    
    return app;
};