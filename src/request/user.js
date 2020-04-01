import axios from 'axios';

// 获取数据信息
axios.get('/user',function(res){
    res =res.data;
    console.log(res);
},err=>{
    console.log(err);
});