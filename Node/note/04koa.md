# Koa
## 基本语法
1. 上下文：ctx 封装了 req && res
```javascript
const app = new Koa()
app.use((ctx, next) => {})
```
2. 中间件机制：将⼀组需要顺序执⾏的函数复合为⼀个函数，外层函数的参数实际是内层函数的返回值
```javascript
app.use((ctx, next) => {console.log('执行1');next(); console.log('执行5')})
app.use((ctx, next) => {console.log('执行2');next(); console.log('执行4')})
app.use((ctx, next) => {console.log('执行3');next()})
```
3. 路由: 借助 koa-router
    - `const router = require('koa-router')()`
    - `router['get'||'post']('/api', (ctx, next) => ctx.body = '')`
    - `app.use(router.routes())`
4. 处理数据
    - 服务器给客户端传数据：`ctx.body = ...`
    - 服务器获取客户端传过来的数据
        - get请求：`ctx.query`
        - post请求：借助 koa-body
            - 普通数据：`ctx.request.body`
            - file数据：`app.use(koaBody({multipart: true})); ctx.request.files`
5. 静态服务器：借助 koa-static
    - `app.use(require('koa-static')(__dirname + '/www'))`
## 原理
1. context
2. 中间件机制：compose <https://github.com/koajs/compose/blob/master/index.js>
3. 路由
4. 静态文件托管