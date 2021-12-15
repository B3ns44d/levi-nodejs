import http from 'http'
import Route from 'route-parser'

const levi = (() => {
  let routes = []

  const addRoute = (method, url, handler) => {
    routes.push({ method, url: new Route(url), handler })
  }

  const findRoute = (method, url) => {
    const route = routes.find((route) => {
      return route.method === method && route.url.match(url)
    })

    if (!route) return null

    return { handler: route.handler, params: route.url.match(url) }
  }

  const get = (route, handler) => addRoute('get', route, handler)

  const router = () => {
    const listen = (port, callback) => {
      try {
        http
          .createServer((req, res) => {
            const method = req.method.toLowerCase()
            const url = req.url.toLowerCase()
            const route = findRoute(method, url)

            if (route) {
              req.params = route.params
              res.send = (response) => {
                res.writeHead(200, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify(response))
              }

              return route.handler(req, res)
            }

            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end('Route not found.')
          })
          .listen(port, callback)
      } catch (error) {
        throw new Error(error)
      }
    }

    return {
      listen,
      get,
    }
  }

  return router
})()

module.exports = levi
