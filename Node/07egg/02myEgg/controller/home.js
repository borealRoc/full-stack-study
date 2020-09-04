// module.exports = {
//     index: async ctx => {
//         ctx.body = '首页 ctrl'
//     },
//     detail: async ctx => {
//         ctx.body = '首页详情 ctrl'
//     }
// }

module.exports = app => ({
    index: async ctx => {
        // 从service层获取
        // const name = await app.$service.user.getName()
        // ctx.body = '首页 ctrl ' + name
        // 从Model层获取
        app.ctx.body = await app.$model.user.findAll()
    },
    detail: ctx => {
        const age = app.$service.user.getAge()
        app.ctx.body = '首页详情 ctrl ' + age
    }
})