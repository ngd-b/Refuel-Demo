const mongoose = require('mongoose');
// 数据库配置文件
const DBConfig = require("../config/dbConfig").dbConfig;

mongoose.connect(DBConfig.url,{
    poolSize:20,
    useCreateIndex:true,
    useNewUrlParser:true,
},(err)=>{
    if(err){
        console.error('conn error:'+err.message);
    }
});

// models 
require("./userInfo");


exports.UserInfo = mongoose.model('userInfo');