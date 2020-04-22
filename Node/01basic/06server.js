const http = require('http')
const fs = require('fs')

http.createServer((req, res) => {
    const { url, method, headers } = req
    if (url === '/' && method === 'GET') {
        // 页面
        fs.readFile('www/index.html', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/pain;charset=utf-8' })
                res.end('服务器错误')
            }
            res.statusCode = 200
            res.setHeader('Content-Type', 'text/html;charset=utf-8')
            res.end(data)
        })
    } else if (url === '/users' && method === 'GET') {
        // 接口
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ name: 'xu' }))
    }  else if (headers.accept.indexOf('image/*') !== -1 && method === 'GET') {
        // 图片
        fs.createReadStream(`www${url}`).pipe(res)
    } else {
        // 404
        res.statusCode = 404
        res.setHeader('Content-Type', 'text/plain;charset=utf-8')
        res.end('页面不存在')
    }
}).listen(3200)
