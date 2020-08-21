const express = require('express')
const app = express()
app.listen(8080)

// 1. express是从上往下走的
// 2. res可以发送任何格式的数据

// 3. 服务器给浏览器发送数据
// 3.1 get请求
app.get('/index', (req, res, next) => {
    console.log('开始访问/index')
    // 可以分段处理同一个接口
    next()
})
app.get('/index', (req, res, next) => {
    // 可以分段处理同一个接口node
    res.send({ message: 'get' })
})
// 3.2 post请求[不带next参数]
app.post('/index', (req, res) => {
    res.send({ message: 'post' })
})

// 4. 服务器获取浏览器传过来的数据
// 4.1 get请求，直接req.query获取
app.get('/get', (req, res, next) => {
    res.send(req.query)
})
// 4.2 post请求，使用body-parser中间件
const body = require('body-parser')
app.use(body.urlencoded({
    extended: false
}))
app.post('/post', (req, res) => {
    res.send(req.body)
})
// 手动实现body-parser的urlencoded方法
const myBody = require('./lib/urlencoded')
app.post('/login', (req, res) => {
    app.use(myBody.urlencoded())
    res.send(req.body)
})
// 4.3 post请求，处理文件
const multer = require('multer')
const upload = multer({ dest: './uploads' })
app.use(upload.any())
app.post('/file', (req, res) => {
    res.send(req.files)
})

// 5. cookie相关
// 5.1 cookie-parse
const cookieParser = require('cookie-parser')
app.use(cookieParser('thisisasecreetkey')) //自己保管的一份密钥
app.get('/cookie', (req, res) => {
    console.log('signedCookieds', req.signedCookies)
    res.cookie('money', 100.00, {
        // domain: '',
        // path: '',
        maxAge: 24 * 3600 * 1000, //1天
        httpOnly: true,
        // secture: true,
        signed: true
    })
    res.send('OK')
})
// 5.2 cookie-session
const cookieSession = require('cookie-session')
app.use(cookieSession({
    keys: ['lskdjflksjflks', 'skdhfksahdfkjsa', 'suibianluanshude'],
    maxAge: 20 * 60 * 1000
}))
app.get('/session', (req, res) => {
    if (req.session['amount']) {
        req.session['amount'] += 1
    } else {
        req.session['amount'] = 1
    }
    req.session['money'] = 100.00
    res.send(`欢迎您，这是您第${req.session['amount']}访问本网站，您的余额还有&yen;${req.session['money']}`)
})

// 6 托管静态文件，使用 Express 中的 express.static 内置中间件函数, 一般放在最后
app.use(express.static('www'))
