import { FastifyInstance } from 'fastify';
import { build } from './app';

const start = async () => {
    const app: FastifyInstance = await build({ logger: true });
    try {
        await app.listen({ port: 3000, host: "0.0.0.0" });
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};
start();