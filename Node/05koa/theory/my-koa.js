const http = require('http')
const context = require('./context')
const request = require('./request')
const response = require('./response')

class MyKoa {
    constructor() {
        // 初始化中间件数组
        this.middlewares = []
    }

    use(middleware) {
        // 将中间件加到数组
        this.middlewares.push(middleware)
    }

    listen(...args) {
        const server = http.createServer(async (req, res) => {
            // this.cb(req, res)
            // 用 ctx 取代req和res
            let ctx = this.createContext(req, res)
            // 中间件合成
            const fn = this.compose(this.middlewares)
            // 依次执行中间件
            await fn(ctx)   
            res.end(ctx.body)
        })
        server.listen(...args)
    }
    // 构建上下文, 把res和req都挂载到ctx之上，并且在ctx.req和ctx.request.req，以及ctx.res和ctx.response.res同时保存
    createContext(req, res) {
        const ctx = Object.create(context)
        ctx.request = Object.create(request)
        ctx.response = Object.create(response)

        ctx.req = ctx.request.req = req
        ctx.res = ctx.response.res = res

        return ctx
    }
    // 合成函数
    compose(middlewares) {
        return function (ctx) { // 传入上下文
            // 执行第0个
            return dispatch(0)
            function dispatch(i) {
                let fn = middlewares[i]
                if (!fn) {
                    return Promise.resolve()
                }
                return Promise.resolve(
                    // 将上下文传入中间件，mid(ctx,next)
                    fn(ctx, function next() {
                        // promise完成后，再执行下一个
                        return dispatch(i + 1)
                    })
                )
            }
        }
    }
}

module.exports = MyKoa