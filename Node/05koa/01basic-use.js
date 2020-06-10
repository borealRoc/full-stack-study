const Koa = require('koa')
const app = new Koa()

app.use((ctx, next) => {
    ctx.body = [
        {
            name: 'xu'
        }
    ]
    next()
})
app.use((ctx, next) => {
    if (ctx.url === '/html') {
        ctx.type = `text/html;charset=utf-8`
        ctx.body = `<h1>我的名字是:${ctx.body[0].name}</h1>`
    }
})
app.listen(3000)
