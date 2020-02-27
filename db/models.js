/*
包含n个操作数据库集合数据的model模块
 */

// 引入mongoose
const mongoose = require('mongoose');
// 链接数据库
mongoose.connect('mongodb+srv://qikaigao:qikaigao@linkedout-xay4r.mongodb.net/linkedout_db?retryWrites=true&w=majority');
// 获取链接对象
const cnn = mongoose.connection;
// 绑定监听
cnn.on('connected',() => {
    console.log('db connected success!')
});

//定义schema
const userSchema = mongoose.Schema({
   username:{type:String,required:true}, //用户名
   password:{type:String,required:true}, //密码
   type:{type:String,required:true}, //用户类型
   header:{type:String},//头像名称
   post:{type:String},//职位
   info:{type:String},//个人或职位简介
   company:{type:String},//公司名称
   salary:{type:String}//月薪
});

//定义model
const UserModel = mongoose.model('user',userSchema);

//暴露Model


exports.UserModel =  UserModel;