const Router = require('koa-router');
const products = require('../../data/products');
const router = new Router();

router.get('/product/', async (ctx, next) => {
    ctx.body = products;    
});

router.get('/product/:id', async (ctx, next) => {
    ctx.body = "Welcome! product " + ctx.params.id +"!"
});

router.get('/product/edit/:id', async (ctx, next) => {
    ctx.body = "Welcome! product edit " + ctx.params.id +"!"
});

router.post('/product/' , async (ctx, next) => {
    ctx.status = 200;
    ctx.body= {
        status:"success",
        product: ctx.request.body
    };
});

module.exports = router;