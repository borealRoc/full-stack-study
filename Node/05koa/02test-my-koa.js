const Koa = require('./theory/my-koa')
const app = new Koa()

// app.use((req, res) => {
//     res.writeHead(200)
//     res.end('Hello, My Koa.')
// })
app.use(ctx => {
    console.log('ctx', ctx)
    ctx.body = 'Hello, My Koa.'
})
app.listen(4000, () => {
    console.log('监听端口4000')
})