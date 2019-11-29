var mongoose = require('mongoose');
//用户密码账户管理
var schema = new mongoose.Schema({
   username: String,
   password: String,
   imgUrl:String
})
var notifymodel=mongoose.model('notifymodel',schema);
module.exports=notifymodel;