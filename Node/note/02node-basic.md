# 核心API
1. 模块
    - 内建模块：node自带，直接用
    - 第三方模块：先`npm install`, 才能用
    - 自定义模块
        - 导出：`module.exports/exports`
        - 导入：`require`
2. buffer: 二进制
3. fs: `fs.readFile(file, (err, data) => {})`
4. http: `http.createServer((req, res) => {}).listen(3000)`
5. stream: 流
    - 文件流：`fs.createReadStream(file).pile(fs.createWriteStream(file))`
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