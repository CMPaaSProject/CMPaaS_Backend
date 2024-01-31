import { FastifyInstance, FastifyListenOptions } from 'fastify';
import { build } from './app';
import dotenv from 'dotenv';
import closeWithGrace from 'close-with-grace';

dotenv.config({ path: __dirname + '/.env' });

const start = async () => {
    const app: FastifyInstance = await build({ logger: { transport: { target: 'pino-pretty' }}});
    app.log.info(`Starting server on ${ process.env.HOST }:${ process.env.PORT }`);
    const options: FastifyListenOptions = {
        port: Number( process.env.PORT ) || 3000,
        host: process.env.HOST || '127.0.0.1'
    };
    
    await app.listen( options );
    closeWithGrace( async ( { signal, err, manual } ) => {
        if( err ) {
            app.log.error( `Server closing with error ${ err }` );
        }
        await app.close();
    });
};

start();