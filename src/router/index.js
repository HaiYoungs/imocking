const router = require('koa-router')();
//导入controller
const { accessGetCon, accessPostCon } = require('../controller/index');



//注册、使用路由
const routerFun = (app) => {
    
    router.get('/:fpath/:action' , accessGetCon);
    router.post('/:fpath/:action', accessPostCon);

    //使用路由
    app.use(router.routes());   
}

module.exports = routerFun;