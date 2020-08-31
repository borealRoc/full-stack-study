# 鉴权
## Session/Cookie
1. cookie
    - 设置 `res.setHeader('Set-Cookie', 'cookie1 = abc')`
    - 问题：长度有限；用户可以篡改（所以有了Session）
2. Session
    - 客户端首次访问服务器
        - 服务器用cookie的形式给客户端发送sessionID
        - 服务器的sessionID和用户是一一对应的
    - 客户端再次访问服务器
        - 客户端带上sessionID
        - 服务器通过认证sessionID，从而鉴权
## Token-JWT
## OAuth
## SSO