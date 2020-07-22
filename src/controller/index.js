const fs = require('fs');
const path = require('path');
// 引入 service
const { getService, deleteService, updateService, updateAllService, addService } = require('../service/index');

const getFilePath = (fpath) => {
    //读取 mock 文件夹内文件名及文件路径
    let mockPath = path.resolve(__dirname, '../../mock'),
    files = fs.readdirSync(mockPath),//文件名数组(带后缀)
    routerArr = files.map(item => {
        return item.slice(0, item.indexOf('.'));
    }),//文件名数组（不带后缀）
    pathArr = files.map(item => {
        return path.join(mockPath, item);
    });//文件路径数组

    let index = routerArr.indexOf(fpath);
    return pathArr[index];
}

//获取数据
const accessGetCon = async (ctx, next) => {
    let filepath = getFilePath(ctx.params.fpath),
        action = ctx.params.action,
        id = ctx.request.query.id || '';
    if (action == 'get') {
        let result = await getService(filepath, id);
        ctx.body = result;
    } else if (action == 'delete') {
        let result = await deleteService(filepath, id);
        ctx.body = result;
    }
}

const accessPostCon = async (ctx, next) => {
    let filepath = getFilePath(ctx.params.fpath),
        action = ctx.params.action,
        req = ctx.request.body;
    if (action == 'update') {
        let result = await updateService(filepath, req);
        ctx.body = result;
    } else if (action == 'add') {
        let result = await addService(filepath, req);
        ctx.body = result;
    } else if (action == 'updateAll') {
        //console.log(req)
        let result = await updateAllService(filepath, req);
        ctx.body = result;
    }
}

module.exports = {
    accessGetCon,
    accessPostCon
}