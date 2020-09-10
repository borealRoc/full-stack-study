const Koa = require('koa')
const Router = require('koa-router')
const static = require('koa-static')
const bodyParser = require('koa-bodyparser');
const app = new Koa()
app.use(bodyParser())
const router = new Router()
app.use(static(__dirname + '/'))

const axios = require('axios')
const conf = require('./conf')

// 1 微信服务端 -- 获取用户 token 和获取关注列表
// 1.1 原生调用
// const tokenCache = {
//     access_token: '',
//     updateTime: Date.now(),
//     expires_in: 7200,
// }
// router.get('/getTokens', async ctx => {
//     const wxDomain = `https://api.weixin.qq.com`;
//     const path = `/cgi-bin/token`;
//     const params = `?grant_type=client_credential&appid=${conf.appid}&secret=${conf.appsecret}`;
//     const url = `${wxDomain}${path}${params}`;
//     const res = await axios.get(url);
//     Object.assign(tokenCache, res.data, {
//         updateTime: Date.now()
//     });
//     ctx.body = res.data
// })
// router.get('/getFollowers', async ctx => {
//     const url = `https://api.weixin.qq.com/cgi-bin/user/get?access_token=${tokenCache.access_token}`
//     const res = await axios.get(url)
//     ctx.body = res.data
// })

// 1.2 借助co-wechat-api调用
const WechatAPI = require('co-wechat-api')
const { ServerToken,ClientToken } = require('./mongoose')
const api = new WechatAPI(conf.appid, conf.appsecret,
    async function () {
        return await ServerToken.findOne()
    },
    async function (token) {
        const res = await ServerToken.updateOne({}, token, { upsert: true })
    }
);
router.get('/getFollowers', async ctx => {
    let res = await api.getFollowers();
    res = await api.batchGetUsers(res.data.openid, 'zh_CN');
    ctx.body = res
})


// 2. 微信网页端
// 2.1 微信第三方登陆
const OAuth = require('co-wechat-oauth')
const oauth = new OAuth(conf.appid, conf.appsecret,
    async function (openid) {
        return await ClientToken.getToken(openid)
    },
    async function (openid, token) {
        return await ClientToken.setToken(openid, token)
    }
)
/**
 * 2.1.1 生成用户URL
 */
router.get('/wxAuthorize', async (ctx, next) => {
    const state = ctx.query.id
    console.log('ctx.query.id: ', state)
    console.log('ctx.href: ', ctx.href)
    let redirectUrl = ctx.href
    redirectUrl = redirectUrl.replace('wxAuthorize', 'wxCallback')
    console.log('redirectUrl: ', redirectUrl)
    const scope = 'snsapi_userinfo'
    // const scope = 'snsapi_base'
    const url = oauth.getAuthorizeURL(redirectUrl, state, scope)
    console.log('url: ', url)
    ctx.redirect(url)
})
/**
 *  2.1.2 用户回调方法
 */
router.get('/wxCallback', async ctx => {
    const code = ctx.query.code //授权码
    console.log('ctx.query.code: ', code)
    const token = await oauth.getAccessToken(code)
    const accessToken = token.data.access_token
    const openid = token.data.openid
    console.log('accessToken', accessToken)
    console.log('openid', openid)
    ctx.redirect('/?openid=' + openid)
})
/**
 *  2.1.3 获取用户信息
 */
router.get('/getUser', async ctx => {
    const openid = ctx.query.openid
    console.log('/getUser openid: ', openid)
    const userInfo = await oauth.getUser(openid)
    console.log('userInfo:', userInfo)
    ctx.body = userInfo
})

/**
 * 2.2 获取JSConfig
 */
router.get('/getJsConfig',async ctx => {
    const res = await api.getJsConfig(ctx.query)
    ctx.body = res
})

app.use(router.routes()); /*启动路由*/
app.use(router.allowedMethods());
app.listen(3000);