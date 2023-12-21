import Fastify from "fastify";

export const build = async (opts: object) => {
    const app = Fastify(opts);

    app.get("/", async (request, reply) => {
        return { hello: "world" };
    });
    
    return app;
};