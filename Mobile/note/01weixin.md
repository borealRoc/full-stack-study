# 微信公众号
## 开发环境
1. 注册微信订阅号 <https://mp.weixin.qq.com/>
2. sunny-ngrok (内网穿透tunnel) <https://www.ngrok.cc/>
## 公众号服务端
1. 客服消息
    - 方法1: 微信公众号平台设置 <https://mp.weixin.qq.com/cgi-bin/frame?t=advanced/dev_tools_frame&nav=10049&token=1003798924&lang=zh_CN>
    - 方法2: 开通公众号测试账号 <http://mp.weixin.qq.com/debug/cgi-bin/sandboxinfo?action=showinfo&t=sandbox/index>, 借助微信公众平台消息接口服务中间件: `npm i co-wechat -S`, 在自己的服务器写代码实现
2. 验证 -- 我们的服务器验证微信
    ```javascript
    const {
        signature, // 微信加密签名，signature结合了开发者填写的token参数和请求中的timestamp参数、nonce参数。
        timestamp, // 时间戳
        nonce, // 随机数 
        echostr // 随机字符串
    } = query
    ```
    - 将 token timestamp nonce 三个参数进行字典序排序并用sha1加密 
    ```javascript
    let str = [conf.token, timestamp, nonce].sort().join('')
    let strSha1 = crypto.createHash('sha1').update(str).digest('hex')
    ```
    - 签名对比，相同则验证通过 `if (signature == strSha1)`
3. 服务器端调用微信API
    - 方法1: 微信公众号平台设置 <https://mp.weixin.qq.com/cgi-bin/frame?t=advanced/dev_tools_frame&nav=10049&token=1003798924&lang=zh_CN>
    - 方法2: 微信公众号开发文档 <https://developers.weixin.qq.com/doc/offiaccount/Getting_Started/Overview.html>, 借助微信公共平台Node库API: `npm i 'co-wechat-api -S`
4. 多进程下保存 token 全局票据
    - 将 token 保存到数据库
## 公众号网页端
### 一、网页授权获取用户基本信息
1. 原理 -- OAuth2.0  
<img src="oauth2_1.png"/>  
<img src="oauth2_2.png"/>  

2. 开发过程
- 2.1 微信公众号平台授权
    - 2.1.1 获取 “网页授权 -- 网页授权获取用户基本信息” 的权限 
        - <https://mp.weixin.qq.com/advanced/advanced?action=table&token=228924665&lang=zh_CN>
        - 有一个疑问：服务号支持，订阅号不支持？
    - 2.1.2 修改授权回调域名
        - <https://mp.weixin.qq.com/debug/cgi-bin/sandboxinfo?action=showinfo&t=sandbox/index>
- 2.2 借助 `npm i co-wechat-oauth -S` 开发
    - 2.2.1 生成用户URL： `oauth.getAuthorizeURL`
    - 2.2.2 获取用户回调 AccessToken 与 OpenId
    ```javascript
    let token = await oauth.getAccessToken(code)
    let accessToken = token.data.access_token
    let openid = token.data.openid
    ```
    - 2.2.3 用户信息: `let userInfo = oauth.getUser(openid)`
    - 2.2.4 AccessToken缓存: 保存到数据库
## 二、JSSDK
1. <https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html>
2. 定义：开发者在网页上通过JavaScript代码使用微信原生功能
3. 后端获取JSConfig, 借助 `npm i 'co-wechat-api -S`

