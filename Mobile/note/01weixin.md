# 微信公众号
## 开发环境
1. 注册微信订阅号 <https://mp.weixin.qq.com/>
2. sunny-ngrok (内网穿透tunnel) <https://www.ngrok.cc/>
## 实战
1. 客服消息
    - 方法1: 微信公众号平台设置 <https://mp.weixin.qq.com/cgi-bin/frame?t=advanced/dev_tools_frame&nav=10049&token=1003798924&lang=zh_CN>
    - 方法2: 开通公众号测试账号 <http://mp.weixin.qq.com/debug/cgi-bin/sandboxinfo?action=showinfo&t=sandbox/index>, 借助`npm i co-wechat -S`, 在自己的服务器写代码实现
2. 验证 -- 我们的服务器验证微信
3. 服务器端调用微信API
    - 方法1: 微信公众号平台设置 <https://mp.weixin.qq.com/cgi-bin/frame?t=advanced/dev_tools_frame&nav=10049&token=1003798924&lang=zh_CN>
    - 方法2: 微信公众号开发文档 <https://developers.weixin.qq.com/doc/offiaccount/Getting_Started/Overview.html>