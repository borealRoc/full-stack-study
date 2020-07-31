# 路由
1. `app.method('/api', (req, res, next) => {})`
    - method: use, get, post
    - use会拦截所有请求，最先执行。所以use内部必须next()
    - 托管静态文件: `app.use(express.static('www'))`
# 中间件
1. body-parser: 处理post请求普通数据
2. multer: 处理post请求file数据
3. cookie && session
    - cookie: 存储在浏览器，请求服务器时，会附在请求头发到服务器
        - 问题：不安全。用户可以篡改
        - 解决：设置httpOnly; 对cookie进行签名[浏览器的cookie容量只有4kb，签名会让cookie变长变大]
    - session: 存储在服务器，不是独立存在，基于cookie[token:存储在cookie里面的sessionID]
        - 问题：session挟持[sessionID被盗取]
        - 解决：缩短sessionID有效期[一般设置20分钟]，定时更新
    - cookie-parse
        - 读取：
            - req.cookies: 普通cookie
            - req.signedCookies: 签名过的cookie
        - 写入: 
        ```javascript
        res.cookie('key', value, {
            domain: //cookie所在的域[cookie本身不能跨域]
            path:   //cookie所在的目录
            maxAge: //cookie过期时间
            httpOnly: true //通过js无法读取cookie信息
            secture: true //表示浏览器仅通过 HTTPS 连接传回 cookie
            signed: true //对value进行签名[s:value.签名]
        })
        ```
    - cookie-session
        - token其实只是一个32位的签名，它并没有加密
        - 拓展：签名是不可逆的，加密是可逆的
# 原理