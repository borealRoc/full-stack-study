// module.exports = {
//     "get /": async ctx => {
//         ctx.body = "用户首页";
//     },
//     "get /detail": async ctx => {
//         ctx.body = "用户页面详情";
//     },
// };

// module.exports = app => ({
//     'get /': app.$ctrl.user.name,
//     'get /detail': app.$ctrl.user.age,
// })

module.exports = {
    "get /": async app => {
        const name = await app.$service.user.getName()
        app.ctx.body = "用户" + name;
    },
    // /user/info
    "get /info": app => {
        app.ctx.body = "用户年龄" + app.$service.user.getAge();
    }
}