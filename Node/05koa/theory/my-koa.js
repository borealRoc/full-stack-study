const http = require('http')
const context = require('./context')
const request = require('./request')
const response = require('./response')

class MyKoa {
    use(cb) {
        this.cb = cb
    }
    listen(...args) {
        const server = http.createServer((req, res) => {
            // this.cb(req, res)
            // 用 ctx 取代req和res
            let ctx = this.createContext(req, res)
            this.cb(ctx)
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
}

module.exports = MyKoa