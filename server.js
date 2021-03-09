'use strict'

const environment = process.env.NODE_ENV || 'development'
const isProd = environment.includes('production')

const config = require('config')
const path = require('path')
const AutoLoad = require('fastify-autoload')
const mercurius = require('mercurius')
const gqSchema = require('./graphql/schema')

const fastify = require('fastify')({ 
    logger: true,
    authenticated: true,
})

fastify
  .register(mercurius, {
    schema: gqSchema,
    graphiql: 'playground',
    jit: 1
  })


const start = async () => {
  try {
    let address = await fastify.listen(
      process.env.PORT || config.port,
      '0.0.0.0'
    )
    console.log(
        `server listening on ${address}. Login page at ${address}/login. GraphQl Playground ${address}/playground. ${
            !isProd ? `Docs at ${address}/documentation` : ''
          }` 
    )
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

if (process) {
  process.on('SIGINT', async () => {
    fastify.log.info('stopping fastify server')
    await fastify.close()
    process.exit(0)
  })
  process.once('SIGUSR2', async () => {
    fastify.log.info('stopping fastify server SIGUSR2')
    await fastify.close()
    process.exit(0)
  })
  process.once('SIGHUP', async () => {
    fastify.log.info('stopping fastify server SIGHUP')
    await fastify.close()
    process.exit(0)
  })
}

start()

module.exports = fastify
