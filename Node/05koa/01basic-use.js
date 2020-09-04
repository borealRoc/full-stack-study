const Koa = require('koa')
const app = new Koa()

// 1. 中间件机制、请求、响应处理
// 打印时间日志
// app.use(async (ctx, next) => {
//     const start = new Date()
//     const t_start = start.getTime()
//     console.log(`start: 开始于${start} 请求${ctx.url}`)
//     await next()
//     const end = new Date()
//     const t_end = end.getTime()
//     console.log(`end: 结束于${end} 总共耗时${parseInt(t_end - t_start)}ms`)
// })
// app.use((ctx, next) => {
//     console.log('1号执行')
//     ctx.body = [
//         {
//             name: 'xu'
//         }
//     ]
//     next()
// })
// app.use((ctx, next) => {
//     console.log('2号执行')
//     const { url, method, body } = ctx
//     console.log('url', url)
//     console.log('method', method)
//     body && body.push({ name: 'shao' })
//     console.log('body', body)
//     if (url === '/html') {
//         ctx.type = 'text/html;charset=utf-8'
//         ctx.body = `<h1>My name is ${body[0].name}</h1>`
//     }
//     next()
// })

// // 2. 路由
// const router = require('koa-router')()
// router.get('/get', async (ctx, next) => {
//     // 获取get请求浏览器传过来的数据
//     ctx.body = ctx.query
// })
// const koaBody = require('koa-body')
// app.use(koaBody({
//     multipart: true,
//     formidable: {
//         maxFileSize: 200 * 1024 * 1024    // 设置上传文件大小最大限制，默认2M
//     }
// }))
// router.post('/post', async (ctx, next) => {
//     // 获取post请求浏览器传过来的普通数据
//     console.log('/post ctx.request.body', ctx.request.body)
//     ctx.body = ctx.request.body
// })

// router.post('/file', async (ctx, next) => {
//     // 获取post请求浏览器传过来的file数据
//     console.log('/file ctx.request.files', ctx.request.files)
//     ctx.body = ctx.request.files
// })

// app.use(router.routes())

// 3. 静态服务器
app.use(require('koa-static')(__dirname + '/www'))

app.listen(4000)