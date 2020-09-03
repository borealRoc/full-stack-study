// module.exports = {
//     index: async ctx => {
//         ctx.body = '首页 ctrl'
//     },
//     detail: async ctx => {
//         ctx.body = '首页详情 ctrl'
//     }
// }

// 从service层获取
module.exports = app => ({
    index: async ctx => {
        const name = await app.$service.user.getName()
        ctx.body = '首页 ctrl ' + name
    },
    detail: ctx => {
        const age = app.$service.user.getAge()
        ctx.body = '首页详情 ctrl ' + age
    }
})