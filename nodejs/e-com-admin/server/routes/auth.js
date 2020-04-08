const Router = require('koa-router');
const passport = require('koa-passport');
const UserService = require('../services/UserService');

const router = new Router({ prefix: '/auth' });

router.post('/register', async (ctx) => {
    const user = await UserService.addData(ctx.request.body);
    return passport.authenticate('local', (err, user, info, status) => {
        if (user) {
            ctx.body = 200;
            ctx.body = { status: 'success' };
        } else {
            ctx.status = 400;
            ctx.body = { status: 'error' };
        }
    })(ctx);
});

router.post('/login', async (ctx) => {
    console.log(ctx.request.body);
    return passport.authenticate('local', (err, user, info, status) => {
        if (user) {
            ctx.login(user);
            ctx.body = 200;
            ctx.body = { status: 'success' };
        } else {
            ctx.status = 400;
            ctx.body = { status: 'error' };
        }
    })(ctx);
});

router.get('/logout', async (ctx) => {
    if (ctx.isAuthenticated()) {
        ctx.logout();
        ctx.body = 200;
        ctx.body = { status: 'success' };
    } else {
        ctx.body = { success: false };
        ctx.throw(401);
    }
});

module.exports = router;