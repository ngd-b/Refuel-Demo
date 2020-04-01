/**
 * 添加用户数据
 * 清除数据后、重新添加
 */

const UserInfo = require("../proxy").UserInfo;

// 移除所有数据
UserInfo.removeDoc(function(err){
    if(err){
        console.log(err);
    }
});

// 添加数据
// 测试数据 1
UserInfo.newAndSave({
    name:"刘欢",
    mobile:"15619205148",
    carNum:"苏A 0F00Q0",
    carColor:"black",
    carType:"car",
    oilLabel:"92",
    integal:322,
    idCard:"610327199611071213",
    address:"江苏省南京市栖霞区尧化街道",
    meta:"",
    invoiceInfo:{
        headerType:"公司抬头",
        invoiceHeader:"江苏金晓电子信息股份有限公司",
        invoiceNumber:"9130200732453342",
        invoiceContent:"加油服务费用",
        receiveWay:"liuhuan@genture.com"
    }
},function(err,user){
    if(err){
        console.log(err);
    }
});
// 测试数据 2
UserInfo.newAndSave({
    name:"赵花倩",
    mobile:"13862991299",
    carNum:"陕B 23F8922",
    carColor:"红色",
    carType:"car",
    oilLabel:"95",
    integal:122,
    idCard:"134245199511271617",
    address:"江苏省南京市栖霞区尧化街道",
    meta:"",
    invoiceInfo:{
        headerType:"公司抬头",
        invoiceHeader:"逸杰软件科技有限公司",
        invoiceNumber:"9130202345153342",
        invoiceContent:"加油服务费用",
        receiveWay:"zhq@genture.com"
    }
},function(err,user){
    if(err){
        console.log(err);
    }
});