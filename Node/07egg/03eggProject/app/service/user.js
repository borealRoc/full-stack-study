const Service = require('egg').Service

class UserService extends Service {
    /**
    * 创建⽤户
    * @param {*} payload
    */
    async create(payload) {
        const { ctx } = this
        payload.password = await ctx.genHash(payload.password)
        return ctx.model.User.create(payload)
    }
}
module.exports = UserService