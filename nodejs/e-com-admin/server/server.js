require('dotenv').config();


const Koa = require('koa');
const Router = require('koa-router');
const json = require('koa-json');
const bodyParser = require('koa-bodyparser');
const productRoutes = require('./routes/product');
const productTypeRoutes = require('./routes/productType');
const port = process.env.PORT || 5000;
console.log(process.env.PORT)

const app = new Koa();
const router = new Router();

app.use(json())
app.use(bodyParser());

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

app.use(router.routes())
    .use(router.allowedMethods());

app.use(productRoutes.routes())
    .use(productRoutes.allowedMethods());

app.use(productTypeRoutes.routes())
    .use(productRoutes.allowedMethods());    

app.listen(port);