import fastifyPlugin from "fastify-plugin";
import fastifyMongodb from "@fastify/mongodb";
import { FastifyInstance } from "fastify";

export default fastifyPlugin(async (fastify: FastifyInstance, {}) => {
    fastify.register(fastifyMongodb, {
        forceClose: true,
        url: "mongodb://localhost:27017/cmpaas"
    });
});