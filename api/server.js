const jsonServer = require('json-server')
const path = require('path')

module.exports = (req, res) => {
  const server = jsonServer.create()
  const router = jsonServer.router(path.join(__dirname, '../db.json'))
  const middlewares = jsonServer.defaults()

  server.use(middlewares)
  server.use(router)
  
  server(req, res)
}
