module.exports = async (ctx, next) => {
    const start = new Date();
    await next();
    const duration = new Date() - start;
    console.log(
        ctx.method + " " + ctx.path + " " + ctx.status + " " + duration + "ms"
    );
};