module.exports = {
    "get /": async ctx => {
        ctx.body = "用户首页";
    },
    "get /detail": ctx => {
        ctx.body = "用户页面详情";
    },
};