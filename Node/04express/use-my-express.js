const express = require('./lib/my-express')
const app = express()
app.listen(8000)

app.get('/index', (req, res, next) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ name: 'xu' }))
})