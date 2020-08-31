const Service = require('egg').Service

class UserService extends Service {
    async getAll() {
        // 直接在service中返回数据
        return [
            { name: '李四' },
            { name: '张三' }
        ]
        // 从model【数据库】中获取数据
        // return await this.ctx.model.User.findAll()
    }
}
module.exports = UserService