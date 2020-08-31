const http = require('http')
const session = {}
const sessionKey = `sid`

http.createServer((req, res) => {
    const { url } = req
    if (url === '/favicon.ico') {
        res.end('')
        return
    } else {
        const { cookie } = req.headers
        console.log('cookie', cookie)

        if (cookie && cookie.indexOf(sessionKey) > -1) {
            // 有cookie状态
            const pattern = new RegExp(`${sessionKey}=([^;]+);?\s*`)
            const sid = pattern.exec(cookie)[1]
            res.end('welcome back ' + session[sid].name)
        } else {
            // 无cookie状态, 设置cookie
            const sid = (Math.random() * 99999999).toFixed()
            res.setHeader('Set-Cookie', `${sessionKey}=${sid};`)
            session[sid] = { name: 'laowang' }
            res.end('hello ' + session[sid].name)
        }
    }
}).listen(3000) 