const path = require('path')
const http = require('http')
import { normalizePort } from '@shared/utils/http'

const port = normalizePort(process.env.PORT || 3000)

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
})

server.listen(port, () => {
  console.log(`Server running at port ${port}`)
})
