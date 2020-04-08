if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const Koa = require('koa');
const Router = require('koa-router');
const json = require('koa-json');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const passport = require('koa-passport');

const productRoutes = require('./routes/product');
const productTypeRoutes = require('./routes/productType');
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');

const port = process.env.PORT || 5000;
console.log(process.env.PORT)

const app = new Koa();
const router = new Router();

app.keys = [process.env.SECRET_KEY || 'super-secret-key'];
app.use(session(app));
app.use(json())
app.use(bodyParser());

// authentication
require('./passport-auth');
app.use(passport.initialize());
app.use(passport.session());

// response
router.get('/', async (ctx, next) => {
    ctx.body = "Hello";
});

router.post('/', async (ctx, next) => {
    ctx.status = 200;
    ctx.body = {
        status: "success",
        message: ctx.request.body.name
    };
});

app.use(authRoutes.routes())
    .use(authRoutes.allowedMethods());

app.use(router.routes())
    .use(router.allowedMethods());

app.use(productRoutes.routes())
    .use(productRoutes.allowedMethods());

app.use(productTypeRoutes.routes())
    .use(productRoutes.allowedMethods());

app.use(userRoutes.routes())
    .use(userRoutes.allowedMethods());

app.listen(port);