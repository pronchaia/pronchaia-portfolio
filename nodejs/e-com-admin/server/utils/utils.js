var isAuthenticated = async function (ctx, next) {
    if (ctx.isAuthenticated())
        return next();
    ctx.status = 400;
    ctx.body = "Authorization field missing";
}
module.exports = {
    isAuthenticated
};