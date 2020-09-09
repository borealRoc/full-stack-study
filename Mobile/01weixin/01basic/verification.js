const Koa = require('koa')
const Router = require('koa-router')
const static = require('koa-static')
const app = new Koa()
const url = require('url')
const conf = require('./conf')

const xml2js = require('xml2js')
const crypto = require('crypto')
const xmlParser = require('koa-xml-body')

app.use(xmlParser())

const router = new Router()
app.use(static(__dirname + '/'))

// 验证
router.get('/wechat', ctx => {
    console.log('微信认证');
    console.log('微信端url', ctx.url)
    const { query } = url.parse(ctx.url, true)
    console.log('微信端query', query)
    const {
        signature, // 微信加密签名，signature结合了开发者填写的token参数和请求中的timestamp参数、nonce参数。
        timestamp, // 时间戳
        nonce, // 随机数 
        echostr // 随机字符串
    } = query

    // 将 token timestamp nonce 三个参数进行字典序排序并用sha1加密
    let str = [conf.token, timestamp, nonce].sort().join('');
    console.log('还未加密的字符串', str)
    let strSha1 = crypto.createHash('sha1').update(str).digest('hex');
    console.log(`自己加密后的字符串为：${strSha1}`);
    console.log(`微信传入的加密字符串为：${signature}`);
    console.log(`服务器验证微信的结果为：${signature === strSha1}`);

    // 签名对比，相同则按照微信要求返回echostr参数值
    if (signature == strSha1) {
        ctx.body = echostr
    } else {
        ctx.body = "你不是微信"
    }
})

// 接受来自用户在公众号发过来的信息
router.post('/wechat', ctx => {
    const { xml: msg } = ctx.request.body
    console.log('接受信息:', msg)
    const builder = new xml2js.Builder()
    const result = builder.buildObject({
        xml: {
            ToUserName: msg.FromUserName,
            FromUserName: msg.ToUserName,
            CreateTime: Date.now(),
            MsgType: msg.MsgType,
            Content: '回复消息' + msg.Content
        }
    })
    ctx.body = result
})

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(3000);