// app.js
const koa = require('koa')
const app = new koa()
const session = require('koa-session')

// 签名key keys⽤来对cookie进⾏签名
app.keys = ['some secret']

// 配置项
const SESS_CONFIG = {
    key: 'xu:sess', // cookie键名
    maxAge: 86400000, // 有效期，默认⼀天
    httpOnly: true, // 仅服务器修改
    signed: true, // 签名cookie
}

// 注册
app.use(session(SESS_CONFIG, app))

app.use(ctx => {
    if (ctx.path === '/favicon.ico') return;
    // 获取
    let n = ctx.session.count || 0;
    // 设置
    ctx.session.count = ++n;
    ctx.body = '第' + n + '次访问';
});

app.listen(3000)