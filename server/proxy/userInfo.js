
const models = require("../model");
const UserInfo = models.UserInfo;

// 首次注册信息
exports.newAndSave = function(obj,callback){
    let user = new UserInfo();

    user.name = obj.name;
    user.mobile = obj.mobile;
    user.carNum = obj.carNum;
    user.carType = obj.carType;
    user.carColor = obj.carColor;
    user.oilLabel = obj.oilLabel;
    user.idCard = obj.idCard;
    user.address = obj.address;
    user.meta = obj.meta;
    user.integal = obj.integal;
    user.invoiceInfo = obj.invoiceInfo;
    // 保存
    user.save(callback);
}

// 根据用户ID查询相关信息
exports.getUserById = function(id,callback){
    if(!id){
        return callback();
    }
    UserInfo.findOne({_id:id},callback);
}

// 根据车辆信息获取注册用户信息
exports.getUserByCarInfo = function(carInfo,callback){
    if(!carInfo||!carInfo.carNum||!carInfo.carType){
        return callback();
    }
    console.log({carNum:carInfo.carNum,carColor:carInfo.carColor,carType:carInfo.carType});
    UserInfo.findOne({carNum:carInfo.carNum,carColor:carInfo.carColor,carType:carInfo.carType},callback);
}

// 删除所有数据
exports.removeDoc = function(callback){
    UserInfo.deleteMany(callback);
}
// 查询到所有数据
exports.findAllUser = function(callback){
    UserInfo.find(callback);
}