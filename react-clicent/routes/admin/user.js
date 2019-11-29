var express = require('express');
var router=express.Router();
var bcrypt=require('bcryptjs')
var jwt=require('jsonwebtoken');
var secret='ddsahdjkhaskdjas';
var saltRound=10
// 租房信息的数据库
var userinfo =require('../../models/userinfo');
// 注册用户数据库
var user=require('../../models/notify')
// 商品信息数据库
var listinfo=require('../../models/index');
// 轮播数据库
var imginfo=require('../../models/banner')
var multer = require('multer')
// 图片存取的路径
var dir = __dirname.split('routes')[0] + '/public/images'
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, dir)
    },
    filename: function (req, file, cb) {
        // 改变图片的名字格式存入数据库
        let pname = file.originalname.split('.');
        let len = pname.length;
        let log = pname[len - 1];
        let oname = new Date().getTime() + parseInt(Math.random() * 999);
        cb(null, `${oname}.${log}`)
    }
})
var upload = multer({ storage: storage })
router.post('/uploader/img', upload.single('myimg'), function (req, res) {
     console.log(req.file);
    let filname = req.file.filename;
    res.send({
        code: 1,
        msg: '上传成功',
        imgurl: `/public/images/${filname}`
    })
});
// 前端登录接口
router.post('/login',function(req,res){
    console.log(req.body);
    let {username,password}=req.body;
    user.find({username:username}).then((result)=>{
        if(result.length==0){
            res.send({
                code:0,
                mes:'用户名错误'
            })
        }
        let hashword=result[0].password;
        bcrypt.compare(password,hashword,(err,data)=>{
            if(data){
                let token=jwt.sign({login:true},secret)
                res.send({
                    code:1,
                    mes:'登录成功',
                    token
                })
            }else{
                res.send({
                    code:0,
                    mes:'密码错误'
                })
            }
        })
    })
})
// 前端注册接口
router.post('/register',function(req,res){
    let {username,password,imgUrl}=req.body
    user.find({username:username}).then((result)=>{ 
        if(result.length==0){
            bcrypt.hash(password,saltRound,(err,hashword)=>{
                if(!err){
                    new user({       
                        password:hashword,
                        imgUrl:imgUrl,
                        username:username
                    }).save().then((re)=>{
                        if(re){
                            res.send({
                                code:1,
                                mes:'注册成功'
                            })
                        }
                    })
                }
            })
        }else{
            res.send({
                code:0,
                mes:'注册失败'
            })
        }
    })
})
// 前端用户发布的租房信息；
router.get('/info',function(req,res){
  console.log(req.query);
   new listinfo(req.query).save().then((reslut)=>{
    res.send({
        code:1
    })
   })
})
// 获取轮播图片的接口
router.get('/listinfo',function(req,res){
   imginfo.find().then((reslut)=>{
       var ress=reslut
       res.send({
           code:1,
           ress,
           msg:'您好'
       })
   })
})
// 详情页接口
router.get('/single',function(req,res){
    console.log(req.query);
    let {id}=req.query;
    listinfo.find({_id:id}).then((reslut)=>{
        let data=reslut;
        res.send({
            code:1,
            data
        })
    })
})
// 获取订单的接口
router.get('/order',function(req,res){
    userinfo.find().then((reslut)=>{
        let data=reslut;
        res.send({
            code:1,
            data
        })
    })
})
//前端获取商品数据的接口
router.get('/alllist',(req,res)=>{
    
    listinfo.find().then((reslut)=>{
        let data=reslut;
        data.reverse();
        res.send({
            code:1,
            data
        })
    })
//    listinfo().find().then((reslut)=>{
//     console.log(reslut);
//    })
})
// 前端提交租房信息
router.get('/msg',(req,res)=>{
    console.log(req.query);
    new userinfo(req.query).save().then((reslut)=>{
        res.send({
            code:1
        })
    })
})
// 模糊查询接口
router.get('/find',function(req,res){
    console.log(req.query);
    let {text}=req.query;
    var texts=new RegExp(text);
    listinfo.find({title:texts}).then((reslut)=>{
        let data=reslut;
        if(reslut){
            res.send({
                code:1,
                data
            })
        }
    })
})

module.exports=router;