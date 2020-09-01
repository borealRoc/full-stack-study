// module.exports = {
//     'get /': async ctx => {
//         ctx.body = '首页'
//     },
//     'get /detail': async ctx => {
//         ctx.body = '首页详情'
//     }
// }

module.exports = app => ({
    'get /': app.$ctrl.index.index,
    'get /detail': app.$ctrl.index.detail,
})