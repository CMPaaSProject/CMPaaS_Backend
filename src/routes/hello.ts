import { FastifyInstance } from "fastify";

export default async (app: FastifyInstance, opts: object) => {
    app.get("/", async (request, reply) => {
        return { hello: "world" };
    });
}