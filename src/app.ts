import Fastify from 'fastify'
import autoload from '@fastify/autoload'
import { join } from 'path'
import { type TypeBoxTypeProvider } from '@fastify/type-provider-typebox'

export const build = async (opts: object): Promise<any> => {
    const app = Fastify(opts).withTypeProvider< TypeBoxTypeProvider >()
    await app.register(autoload, { dir: join(__dirname, 'plugins') })
    await app.register(autoload, { dir: join(__dirname, 'routes') })
    return app
}
