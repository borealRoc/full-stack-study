const fs = require('fs')
const http = require('http')
const zlib = require('zlib')

// 1. 文件流
const rs = fs.createReadStream(`www/demo.jpg`)
const ws = fs.createWriteStream(`www/demo_1.jpg`)
rs.pipe(ws)
rs.on('error', err => console.log('文件读取失败'))
ws.on('finish', () => console.log('文件写入成功'))

// 2. http服务流
http.createServer((req, res) => {
    if (req.url && req.url !== '/favicon.ico') {
        const path = `www${req.url}`
        const rs = fs.createReadStream(path)
        rs.pipe(res)
        rs.on('error', err => {
            res.writeHead(404)
            res.end('Not Found')
        })
    }
}).listen(3100)

// 3. 压缩流
http.createServer((req, res) => {
    if (req.url && req.url !== '/favicon.ico') {
        const path = `www${req.url}`
        const rs = fs.createReadStream(path)
		const gz = zlib.createGzip()
		res.setHeader('content-encoding', 'gzip')
		rs.pipe(gz).pipe(res)
		rs.on('error', err => {
            res.writeHead(404)
            res.end('Not Found')
        })
    }
}).listen(3200)