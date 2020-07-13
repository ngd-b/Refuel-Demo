var express = require('express')
var router = express.Router();
// 数据缓存处理
var CacheCarInfo = require("../utils").CacheCarInfo;
// socket 通信
const io = require("socket.io")(8088,{
    path:"/",
    serveClient:false,
    cookie:false,
})
// 初始化连接状态
io.on('connection',function(socket){
    console.log('a user connect');
    socket.on('disconnect',function(){
        console.log('a user disconnect');
    });
});

const UserInfo = require("../proxy").UserInfo;
// 查询所有用户数据信息
router.get('/',function(req,res){
    UserInfo.findAllUser(function(err,result){
        if(err){
            res.send(JSON.stringify({
                result:false,
                msg:"查询数据失败"
            }));
        }
        res.send(JSON.stringify({
            result:true,
            msg:"查询数据成功",
            datas:result
        }));
    });
});
// 查询某个用户数据
router.post("/getUserByCarInfo",function(req,res,next){
    let carNum = req.body.vehicle_plate,
        carType = req.body.vehicle_type,
        carColor = req.body.car_color,
        is_oilcar = req.body.is_oilcar;
    // 原始的数据传输信息，车辆的识别信息
    let obj = {
        carNum:carNum.toUpperCase(),
        carType,
        carColor,
        carType_str:"小轿车"
    }
    // 每次都打印
    console.log(req.body);
    if(CacheCarInfo.isExit(obj)){
        res.send({
            code:303,
            msg:"重复的车辆信息，不做处理!",
            data:req.body
        });
        return;
    }
    CacheCarInfo.push(obj);
    if(!is_oilcar){
        // 不是来加油的，则自动动忽略不处理
        res.send({
            code:300,
            msg:"非加油车辆,已自动忽略!",
            data:req.body
        });
    }else{
        // 1. 发送接收到雷达检测的信息
        io.sockets.emit('init',obj);
        UserInfo.getUserByCarInfo(obj,function(err,user){
            if(err){
                console.log("查询异常："+err.mesage);
                // 2-2 未查询到注册信息，回复
                io.sockets.emit("user",{
                    result:false,
                    msg:"系统异常,请现场协助处理!"
                });
                next();
            }
            // 查询到车辆信息
            // 2-1 . 查询到注册信息，发送人员信息
            console.log(JSON.stringify(user));
            if(user){
                io.sockets.emit("user",{
                    result:true,
                    msg:"获取到注册用户信息数据!",
                    data:user
                });
            }else{
                io.sockets.emit("user",{
                    result:false,
                    msg:"获取到注册用户信息数据!"
                });
            }
        });
        res.send({
            code:200,
            msg:"加油车辆,正在处理!",
            data:req.body
        });
    }
});

module.exports = router;