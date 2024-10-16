const http = require('node:http')
const { findAvailablePort } = require('./free-port')

const desiredPort = process.env.PORT ?? 3000

const processRequest = (req, res) => {
  if (req.url === '/') {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.end('Hola Mundo, bienvenido')
    console.log('request received')
  } else if (req.url === '/contact') {
    res.statusCode = 200
    res.end('<h1>Contacto</h1>')
  } else {
    res.statusCode = 404
    res.end('<h1>404</h1>')
  }
}

const server = http.createServer(processRequest)

findAvailablePort(desiredPort).then(port => {
  server.listen(port, () => {
    console.log(`server listening on http://localhost:${server.address().port}`)
  })
})
