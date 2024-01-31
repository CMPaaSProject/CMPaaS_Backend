import { FastifyInstance, FastifyListenOptions } from 'fastify';
import { build } from './app';
import dotenv from 'dotenv';

dotenv.config({ path: __dirname + '/.env' });

const start = async () => {
   
    const app: FastifyInstance = await build({ logger: true });
    app.log.info(`Starting server on ${process.env.HOST}:${process.env.PORT}`);
    const options: FastifyListenOptions = {
        port: Number(process.env.PORT) || 3000,
        host: process.env.HOST || '127.0.0.1'
    };
    try {
        await app.listen(options);
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }

};
start();