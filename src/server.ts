import { type FastifyInstance, type FastifyListenOptions } from 'fastify'
import { build } from './app'
import dotenv from 'dotenv'
import closeWithGrace from 'close-with-grace'
import path from 'path'

dotenv.config({ path: path.join(__dirname, '.env') })

const start = async (): Promise<void> => {
    const app: FastifyInstance = await build({ logger: { transport: { target: 'pino-pretty' } } })
    app.log.info(`Starting server on ${process.env.HOST}:${process.env.PORT}`)
    const options: FastifyListenOptions = {
        port: isNaN(Number(process.env.PORT)) || Number(process.env.PORT) === 0 ? 3000 : Number(process.env.PORT),
        host: process.env.HOST ?? '127.0.0.1'
    }

    await app.listen(options)
    closeWithGrace(async ({ signal, err, manual }) => {
        if (err !== null) {
            app.log.error(`Server closing with error ${err?.message}`)
        }
        await app.close()
    })
}
void start()
