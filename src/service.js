function EchoService({ seneca }) {
  seneca.ready(() => {
    setInterval(() => {
      const start = Date.now()
      seneca.act('role:echo,cmd:execute', function(err, result) {
        const totalTime = (Date.now() - start) / 1000
        if (err) {
          return console.error(`Error: ${totalTime}s`)
        }
        console.log(`Done: ${totalTime}s, Msg: ${result.message}`)
      })
    }, 60000)
  })

  seneca.add('role:greet,cmd:execute', function(msg, reply) {
    console.log('received')
    reply({ ok: true, received: Date.now(), message: 'hey' })
  })
}

module.exports = EchoService
