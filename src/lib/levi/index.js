import http from 'http'
import Route from 'route-parser'
import { parse } from 'querystring'
import { logger } from './utils/logger.js'
import fs from 'fs'

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

              if (method === 'post' || method === 'put') {
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

            logger(
              `${
                req.connection.remoteAddress
              } - - [${new Date().toUTCString()}] "${method} ${url} HTTP/1.1" ${
                res.statusCode
              } ${res.getHeader('Content-Length')} "${req.headers.referer}" "${
                req.headers['user-agent']
              }"`
            )

            fs.appendFile(
              'logs/short-report.log',
              `${
                req.connection.remoteAddress
              } - - [${new Date().toUTCString()}] "${method} ${url} HTTP/1.1" ${
                res.statusCode
              } ${res.getHeader('Content-Length')} "${req.headers.referer}" "${
                req.headers['user-agent']
              }"\n`,
              function (err) {
                if (err) throw err
              }
            )
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
    }
  }

  return router
})()

module.exports = levi
