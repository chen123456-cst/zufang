var express = require('express');
var router = express.Router();
// 引入数据库上传图书信息的数据
var bookmodel = require('../models');
//引入用户数据
var usermodel = require('../models/notify')
// 轮播图片的数据接口
var bannermodel=require('../models/banner')
// 
// 上传图片的工具
var multer = require('multer')
// var upload = multer({ dest: 'uploads/' })
// console.log(__dirname)
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
/* GET home page. */
router.post('/uploader/img', upload.single('myimg'), function (req, res) {
    let filname = req.file.filename;
    res.send({
        code: 1,
        msg: '上传成功',
        imgurl: `/public/images/${filname}`
    })
});
// 存入后端管理传入信息
router.get('/upd/list', (req, res) => {
    new bookmodel(req.query).save().then((reslut) => {
        if(reslut){
            res.send({
                code:1
            })
        }    
    })
})
// 房屋租赁详情
router.get('/good/list', (req, res) => {
    bookmodel.find().then((reslut) => {
        let resall = reslut
        res.send({
            code: 1,
            msg: '请求成功',
            resall
        })
    })
})
// 租房信息发表的删除操作
router.get('/artic/del', function (req, res) {
    console.log(req.query.id);
    bookmodel.remove({ _id: req.query.id }).then((reslut) => {
        console.log(reslut);
        if(reslut.deletedCount==1){
            res.send({
                code:1,
                msg:'删除成功',
            })
        }
    })
})
//轮播图片的上传
router.get('/img/upd',(req,res)=>{
    new bannermodel(req.query).save().then((reslut)=>{
        if(reslut){
            res.send({
                code:1
            })
        }
    })
})
// 修改发布后的信息;
module.exports = router;
