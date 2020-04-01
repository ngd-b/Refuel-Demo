/**
 * 车主注册信息表，
 * 
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const ObjectId = Schema.ObjectId;

// 创建用户注册信息表
let userInfoSchema = new Schema({
    name:{type:String},
    mobile:{type:String},       // 手机号
    carNum:{type:String},       // 车牌号
    carType:{type:String},          // 车类型
    carColor:{type:String},       // 车身主体颜色
    oilLabel:{type:String},          // 常用加油类型
    idCard:{type:String},          // 身份证
    address:{type:String},            // 住址所在地
    createTime:{type:String},         // 创建时间
    meta:{type:String},           // 个人头像地址
    integal:{type:Number},            // 个人加油积分
    // 加油记录
    record:[
        {
            id:{type:ObjectId},
            address:{type:String},            // 加油地址
            oilLabel:{type:String},           // 加油类型
            oilMachine:{type:Number},             // 油机编号
            oilGunNum:{type:Number},         // 油枪编号
            createTime:{type:Date},          // 完成时间
            costOil:{type:Number},            // 总加油
            priceOil:{type:Number},              // 油单价
            totalCost:{type:Number},             // 总费用
        }
    ],
    // 开票信息
    invoiceInfo:{
        headerType:{type:String},           // 发票抬头类型
        invoiceHeader:{type:String},          // 发票抬头
        invoiceNumber:{type:String},           // 发票税号
        invoiceContent:{type:String},           // 发票内容
        receiveWay:{type:String},             // 接收地址
    }
});

// 新增时，事件处理
userInfoSchema.pre('save',function(next){
    let now = moment().format("YYYY-MM-DD HH:mm:ss");
    this.createTime = now;
    next();
});

mongoose.model('userInfo',userInfoSchema);