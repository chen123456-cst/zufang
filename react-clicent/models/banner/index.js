var mongoose=require('mongoose');
// 轮播图的接口;
var schem=new mongoose.Schema({
    imgurl:String,
    title:String,
})
var bannerinfo=mongoose.model('banner',schem);
module.exports=bannerinfo;