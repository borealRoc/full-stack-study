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

const tokenCache = {
    access_token: '',
    updateTime: Date.now(),
    expires_in: 7200,
}

router.get('/getTokens', async ctx => {
    const wxDomain = `https://api.weixin.qq.com`;
    const path = `/cgi-bin/token`;
    const params = `?grant_type=client_credential&appid=${conf.appid}&secret=${conf.appsecret}`;
    const url = `${wxDomain}${path}${params}`;
    const res = await axios.get(url);
    Object.assign(tokenCache, res.data, {
        updateTime: Date.now()
    });
    ctx.body = res.data
})

router.get('/getFollowers', async ctx => {
    const url = `https://api.weixin.qq.com/cgi-bin/user/get?access_token=${tokenCache.access_token}`
    const res = await axios.get(url)
    ctx.body = res.data
})

app.use(router.routes()); /*启动路由*/
app.use(router.allowedMethods());
app.listen(3000);