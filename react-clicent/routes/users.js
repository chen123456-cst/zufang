var express = require('express');
var router = express.Router();
var userinfo = require('../models/userinfo')
var usersmodel = require('../models/notify')
/* GET users listing. */
// 登录注册
router.post('/login', function (req, res) {
  console.log(req.body);
  res.send({
    code: '1'
  })
});
// 客户端重置密码的接口
router.get('/del', function (req, res) {
  let id = req.query.id;
  userinfo().update({_id:id},{pwd:666666}).then((reslut)=>{
    let data=reslut;
    res.send({
      code: 1,
      data
    })
  })
})
//后端管理平台获取用户密码管理
router.get('/info', function (req, res) {
  // 用户密码传输
  // userinfo().find().then((reslut) => {
  //   let data = reslut;
  //   if (reslut) {
  //     res.send({
  //       code: 1,
  //       data,
  //     })
  //   }
  // })
})
// 后端用户租房信息
router.get('/msg', function (req, res) {
  userinfo.find().then((reslut)=>{
    let data=reslut;
    res.send({
      code: 1,
      data
    })
  })
  
})
module.exports = router;
