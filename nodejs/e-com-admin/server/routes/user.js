const Router = require('koa-router');
const router = new Router({ prefix: '/users' });
const UserService = require('../services/UserService');

router.get('/', async (ctx, next) => {
    const allData = await UserService.getAllData();
    ctx.status = 200;
    ctx.body = allData;
});

router.get('/:id', async (ctx, next) => {
    const allData = await UserService.getData(ctx.params.id);
    ctx.status = 200;
    ctx.body = allData;
});

router.post('/', async (ctx, next) => {
    const newData = ctx.request.body;
    try {
        const createdData= await UserService.addData(newData);
        ctx.status = 200;
        ctx.body = {
            status: "success",
            data:createdData
        };
    } catch (error) {
        ctx.status = 400;
        ctx.body = {
            status: "error",
            message: error.message
        };
    }
});

router.put('/:id', async (ctx, next) => {
    const updateData = ctx.request.body;
    try {
        const updatedData= await UserService.updateData(ctx.params.id, updateData);
        ctx.status = 200;
        ctx.body = {
            status: "success",
            data:updatedData
        };
    } catch (error) {
        ctx.status = 400;
        ctx.body = {
            status: "error",
            message: error.message
        };
    }
});

router.delete('/:id', async (ctx, next) => {
    const deletedData = await UserService.deleteData(ctx.params.id);
    ctx.status = 200;
    ctx.body = deletedData;
});


module.exports = router;