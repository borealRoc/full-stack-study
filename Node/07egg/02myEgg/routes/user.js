// module.exports = {
//     'get /': async ctx => {
//         ctx.body = '用户首页'
//     },
//     'get /detail': async ctx => {
//         ctx.body = '用户详情'
//     }
// }

// 从service获取
module.exports = {
    "get /": async app => {
        const name = await app.$service.user.getName()
        app.ctx.body = "用户" + name;
    },
    "get /detail": app => {
        app.ctx.body = "用户年龄" + app.$service.user.getAge();
    }
}