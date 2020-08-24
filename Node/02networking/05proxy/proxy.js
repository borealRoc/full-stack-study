var express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')

const app = express()
app.use(express.static(__dirname + '/'))
app.use('/api', createProxyMiddleware({ target: 'http://localhost:4000', changeOrigin: false }))


module.exports = app