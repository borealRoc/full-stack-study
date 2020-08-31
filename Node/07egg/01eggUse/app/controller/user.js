const Controller = require('egg').Controller

class UserController extends Controller {
    async index() {
        // 在controller中处理数据
        // this.ctx.body = [
        //     { name: 'xu' }
        // ]
        // 从service中获取数据
        const { ctx } = this
        ctx.body = await ctx.service.user.getAll()
    }

}
module.exports = UserController