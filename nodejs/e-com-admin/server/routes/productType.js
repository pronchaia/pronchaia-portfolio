const Router = require('koa-router');
const router = new Router({ prefix: '/producttype' });
const ProductTypeService = require('../services/ProductTypeService');
const { isAuthenticated } = require('../utils/utils');

router.get('/', isAuthenticated, async (ctx, next) => {
    const allData = await ProductTypeService.getAllData();
    ctx.status = 200;
    ctx.body = allData;
});

router.get('/:id', isAuthenticated, async (ctx, next) => {
    const allData = await ProductTypeService.getData(ctx.params.id);
    ctx.status = 200;
    ctx.body = allData;
});

router.post('/', isAuthenticated, async (ctx, next) => {
    const newData = ctx.request.body;
    try {
        const createdData = await ProductTypeService.addData(newData);
        ctx.status = 200;
        ctx.body = {
            status: "success",
            data: createdData
        };
    } catch (error) {
        ctx.status = 400;
        ctx.body = {
            status: "error",
            message: error.message
        };
    }
});

router.put('/:id', isAuthenticated, async (ctx, next) => {
    const updateData = ctx.request.body;
    try {
        const updatedData = await ProductTypeService.updateData(ctx.params.id, updateData);
        ctx.status = 200;
        ctx.body = {
            status: "success",
            data: updatedData
        };
    } catch (error) {
        ctx.status = 400;
        ctx.body = {
            status: "error",
            message: error.message
        };
    }
});

router.delete('/:id', isAuthenticated, async (ctx, next) => {
    const deletedData = await ProductTypeService.deleteData(ctx.params.id);
    ctx.status = 200;
    ctx.body = deletedData;
});


module.exports = router;