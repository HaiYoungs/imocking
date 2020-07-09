const Koa = require('koa');
const cors = require('koa2-cors');
const app = new Koa();
const routerFun = require('./src/router/index');
const bodyParser = require('koa-bodyparser');
app.use(cors());
app.use(bodyParser());

//导入配置信息
const { PORT } = require('./config.js');

routerFun (app);

//监听端口
app.listen(PORT, () => {
    console.log('server is running at port 3000');
})