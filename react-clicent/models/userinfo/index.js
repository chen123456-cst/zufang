// 用户租房信息管理
var mongoose=require('mongoose');
const schem=new mongoose.Schema({
    name:String,
    time:String,
    imgurl:String,
    address:String,
    price:String,
})
const userinfo=mongoose.model('userinfo',schem);
module.exports=userinfo