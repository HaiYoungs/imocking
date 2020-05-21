const router = require('koa-router')();
const path = require('path');
const fs = require('fs');
//导入查询数据(controller)
const { getData } = require('../controller/index');

//读取 mock 文件夹内文件名及文件路径
let mockPath = path.resolve(__dirname, '../../mock'),
    files = fs.readdirSync(mockPath),//文件名数组(带后缀)
    routerArr = files.map(item => {
        return item.slice(0, item.indexOf('.'));
    }),//文件名数组（不带后缀）
    pathArr = files.map(item => {
        return path.join(mockPath, item);
    });//文件路径数组

//注册、使用路由
const routerFun = (app) => {
    routerArr.forEach((item, index) => {
        //注册路由
        router.get('/' + item, async (ctx, next) => {
            await getData(pathArr[index]).then(function (dataObj) {
                ctx.body = dataObj;
            }).catch(function (err) {
                console.log(err); 
                ctx.body = 'error'
            })
        })
    })
    //使用路由
    app.use(router.routes());   
}

module.exports = routerFun;