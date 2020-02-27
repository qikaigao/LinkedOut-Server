/*
测试时用mongoose操作mongodb
 */
const md5 = require('blueimp-md5');//加密函数

//1.连接数据库
// 1.1 引入mongoose
const mongoose = require('mongoose');
// 1.2 链接指定数据库
mongoose.connect('mongodb+srv://qikaigao:qikaigao@linkedout-xay4r.mongodb.net/test?retryWrites=true&w=majority');
// 1.3 获取链接对象
const cnn = mongoose.connection;
// 1.4 绑定链接完成的监听
cnn.on('connected', function () {//链接成功的callback
    console.log('数据库链接成功，Cool！');
});

//2.得到对应特定集合的model
// 2.1 字义schema（描述文档结构）
const userSchema = mongoose.Schema({
    username: {type: String, require: true}, //用户名
    password: {type: String, require: true}, //密码
    type: {type: String, require: true}, //用户类型 boss/applicant
    header: {type: String}
});

// 2.2 定义model（与集合对应，可以操作集合）
const UserModel = mongoose.model('user', userSchema); //集合的名称为users

// 3.通过model或者其实例对集合数据进行CRUD操作
// 3.1 通过model实例的save（）添加数据
function testSave() {
    // 创建UserModel的实例
    const userModel = new UserModel({username: 'Jack', password: md5('234'), type: 'applicant'});
    // 调用save()保存
    userModel.save(function (err, doc) {
        console.log('save()', err, doc);
    })
}

// testSave()

// 3.2 通过Model的find/findOne 查询多个或一个数据
function testFind() {
    // 查询多个,得到的是包含所有匹配文档对象的数组，如果没有匹配的就是[]
    UserModel.find(function (err, doc) {
        console.log('find()', err, doc);
    });
    // 查询多个,得到的是匹配的文档对象，如果没有匹配的就是null
    UserModel.findOne({_id: '5e572bf13b9e1e9c3a6c2c20'}, function (err, doc) {
        console.log('findOne()', err, doc);
    });

}

// testFind()

// 3.3 通过Model的findByIdAndUpdate()更新某个数据
function testUpdate() {
    UserModel.findByIdAndUpdate(
        {_id: '5e572fbccee8019e8f2cb1f0'},
        {username: 'Nick'},
        function (err, doc) {
            console.log('findByIdAndUpdate()', err, doc);
        });
}
// testUpdate()

// 3.4 通过Model的remove()删除某个数据
function testDelete() {
    UserModel.remove(
        {_id: '5e572fbccee8019e8f2cb1f0'},
        function (err, doc) { // {n:1/0,ok:1}
            console.log('remove()', err, doc);
        });
}
testDelete()