/**
 * 缓存推送过来的车辆信息，避免重复处理
 */

 const  _  = require('lodash');

 function CacheCarInfo(){
     // 数据缓存容器
     this.cache = [];
     // 定时清理器
     this.timer = [];
     this.size = 0;
 }
 CacheCarInfo.prototype.get = function(){

 }
 CacheCarInfo.prototype.push = function(info){
    let _this = this;
    this.cache.push(info);
    // 定时去清理存入的数据
    ((target)=>{
        setTimeout(()=>{
            let index =  _this.cache.findIndex(item=>_.isEqual(target,item));    
            if(index>-1){
                _this.cache.splice(index,1);
            }
        },30000);
    })(info);
    
 }
 CacheCarInfo.prototype.isExit = function(info){
    return this.cache.some(item=>_.isEqual(item,info));
 }


// let cache = new CacheCarInfo();
// let obj = {
//     carNum:"苏A TY1232",
//     carType:"car",
//     carColor:"red"
// }
// console.log(cache);
// if(cache.isExit(obj)){
//     console.log("已存在");
// }else{
//     cache.push(obj);
// }


 module.exports = new CacheCarInfo();