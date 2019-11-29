var mongoose = require('mongoose');
//存放租房信息的数据库；
var schema = new mongoose.Schema({
    title: String,
    houserwidth: String,
    imgurl: String,
    price: String,
    style:String,
    city:String,
})
const models = mongoose.model('model', schema);
module.exports = models