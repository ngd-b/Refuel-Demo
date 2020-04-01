var express = require('express')
var router = express.Router();
// 路由
const userInfo = require("./userInfo");

//
router.use('/user',userInfo);


module.exports = router;