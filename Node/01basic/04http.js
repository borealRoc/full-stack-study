const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
    if (req.url) {
        const path = `www${req.url}`
        fs.readFile(path, (err, data) => {
            if (err) {
                res.writeHead(404)
                res.end('Not Found')
            } else {
                res.write(data)
                res.end()
            }
        })
    }
})
server.listen(3000)