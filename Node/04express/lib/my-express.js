// 手写简版express
const http = require('http')
const url = require('url')

const routers = []

class Application {
    get(path, handler){
        routers.push({
            path,
            method: 'GET',
            handler,
        })
    }
    listen() {
        http.createServer((req, res) => {
            const {pathname} = url.parse(req.url, true)
            for (const router of routers) {
                const {path, handler, method} = router
                if (path === pathname && method === req.method) {
                    handler(req, res)
                    return
                }
            }
        }).listen(...arguments)
    }
}
module.exports = config => new Application()