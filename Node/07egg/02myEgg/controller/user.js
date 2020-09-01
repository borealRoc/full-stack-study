module.exports = app => ({
    index: async ctx => {
        const name = await app.$service.user.getName()
        app.ctx.body = 'ctrl user' + name
    },
    detail: async ctx => {
        const name = await app.$service.user.getAge()
        app.ctx.body = 'ctrl user' + age
    }
})