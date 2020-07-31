# 并发处理[越来越轻量]
1. 多进程：Linux-Apache, C
2. 多线程：Java
3. 异步IO：JS nginx
4. 协程：lua, openresty, go deno【底层是go和ts】
# 模块
1. 内建模块：node自带，直接用
2. 第三方模块：先`npm install`, 才能用
3. 自动以模块
    - 导出：`module.exports/exports`
    - 导入：`require`
# 核心API
1. buffer: 二进制
2. fs: `fs.readFile(file, (err, data) => {})`
3. http: `http.createServer((req, res) => {}).listen(3000)`
4. stream: 流
    - 文件流：`fs.createReadStream(file).pile().fs.createWriteStream(file)`
    - http请求：`fs.createReadStream(req.url).pipe(res)`
    - 压缩
    ```javascript
    const zlib = require('zlib)
    http.createServer((req, res) => {
        const rs = fs.createReadStream(`www${req.url}`)
        res.setHeader('Content-encoding', 'gzip)
        const gz = zlib.createGzip()
        rs.pipe(gz).pipe(res)
    }).listen(3000)
    ```