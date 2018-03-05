const Seneca = require('seneca')
const PinoLogAdapter = require('seneca-pino-adapter')
const EchoService = require('../src/service')

const serviceConfig = {
  tag: 'echo',

  fixedargs: {
    fatal$: false
  },

  legacy: {
    error: false,
    transport: false
  },

  internal: {
    logger: new PinoLogAdapter({
      config: {
        level: process.env.LOG_LEVEL || 'info'
      }
    })
  },

  plugin: {
    mesh: {
      base: true
    }
  }
}

const service = Seneca(serviceConfig)

service
  .use(require('seneca-mesh'), {
    pin: 'role:greet'
  })
  /*.client({
    type: 'http',
    port: 39998,
    host: '10.101.185.19',
    protocol: 'http'
  })*/
  .use('seneca-repl', { port: 10001 })

EchoService({ seneca: service })
