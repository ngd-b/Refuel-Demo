/**
 * 服务端程序
 */
const path = require('path');
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
// socket 通信

// const io = require("socket.io")(8088,{
//     path:"/",
//     serveClient:false,
//     cookie:false,
// });

const routers = require("./router");
// 测试数据
require("./mock");
// 测试数据库
// const UserInfo = require("./proxy").UserInfo;
// 静态指向资源目录，JS CSS等等 访问
app.use(express.static('public'));
// 模板引擎
app.set('views',path.resolve(__dirname,'../public'));
app.set('view engine','html');
app.engine('html',require('ejs').__express);
// json
app.use(bodyParser.json({limit:"1mb"}));    
// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true,limit:'1mb'}));
// 主页访问视图
app.get("/",function(req,res,next){
   res.render('index');
});
app.get('/test',function(req,res,next){
    res.render('index');
 });
// 路由配置
app.use(routers);
app.listen(8099,function(){
    console.log(`the server start on the port 8099`);
});