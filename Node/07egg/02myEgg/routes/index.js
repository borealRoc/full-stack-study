// module.exports = {
//     'get /': async ctx => {
//         ctx.body = '首页'
//     },
//     'get /detail': async ctx => {
//         ctx.body = '首页详情'
//     }
// }

module.exports = app => ({
    'get /' : app.$ctrl.home.index,
    'get /detail' : app.$ctrl.home.detail,
})