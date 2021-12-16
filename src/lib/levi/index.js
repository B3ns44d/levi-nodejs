import http from 'http'
import Route from 'route-parser'
const { parse } = require('querystring')

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
  const post = (route, handler) => addRoute('post', route, handler)
  const put = (route, handler) => addRoute('put', route, handler)
  const omit = (route, handler) => addRoute('delete', route, handler)
  const use = (route, handler) => addRoute('use', route, handler)

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
                if (typeof response !== 'string') {
                  response = JSON.stringify(response)
                }
                res.end(response)
                res.writeHead(200, { 'Content-Type': 'text/plain' })
              }

              res.json = (response) => {
                res.end(JSON.stringify(response))
                res.writeHead(200, { 'Content-Type': 'application/json' })
              }

              if (method === 'post') {
                let body = ''
                req.on('readable', () => {
                  let chunk = req.read()
                  if (chunk) body += chunk.toString()
                })

                req.on('end', () => {
                  req.body = JSON.parse(body)
                  route.handler(req, res)
                })
              } else {
                route.handler(req, res)
              }
            } else {
              res.writeHead(404, { 'Content-Type': 'application/json' })
              res.end('Route not found.')
            }
          })
          .listen(port, callback)
      } catch (error) {
        throw new Error(error)
      }
    }

    return {
      listen,
      get,
      post,
      put,
      omit,
      use,
    }
  }

  return router
})()

module.exports = levi
