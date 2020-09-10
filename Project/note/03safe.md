# 网络安全
## 一、常见 web 攻击及其防御手段
1. XSS (Cross-Site Scripting) 跨站脚本攻击
    - 1.1 定义：向存在安全漏洞的网站运行非法的非本站点的HTML标签或Javascript
    - 1.2 危害
        - 利用虚假输入表单骗取用户个人信息
        - 利用脚本窃取用户 cookie
    - 1.3 攻击类型
        - 反射型：url 参数直接注入
            - 分析：比如，将用户的浏览器url地址变成： `http://localhost:3000/?from=<script src="http://localhost:4000/hack.js"></script>`，有时，为了让后面的网址没有那么可疑，攻击者会进行短域名伪造 <https://dwz.cn/>
        - 存储性：存储到 DB 后读取时注入
            - 
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
## 二、防御手段
