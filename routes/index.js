var express = require('express');
var router = express.Router();

const {UserModel} = require('../db/models');
const md5 = require('blueimp-md5');
const filter = {password: 0, __v: 0};


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});


// 注册的路由
router.post('/register', function (req, res, next) {
    // 获取请求参数
    const {username, password, type} = req.body;
    // 处理
    // 判断用户是否已经存在，如果存在，返回错误提示,如果不存在，保存
    // 查询（根据username）
    UserModel.findOne(
        {username},
        (err, doc) => {
            // 如果username存在
            if (doc) {
                // 返回提示错误的信息
                res.send({code: 1, msg: 'Username exist!'});
            } else {
                // 保存
                const userModel = new UserModel({username, type, password: md5(password)})
                    .save((err, doc) => {

                        // 生成一个cookie
                        res.cookie('userid', doc._id, {maxAge: 1000 * 60 * 60 * 24 * 7}); // 持久化cookie

                        //返回包含user的信息
                        const data = {username, password, type, _id: doc._id};

                        // 保存成功，返回成功的响应数据
                        res.send({code: 0, data});
                    });
            }
        }
    );
});


// 登陆的路由
router.post('/login', (req, res) => {
    const {username, password} = req.body;
    // 根据username 和 password 查询用数据库users，如果没有：返回提示错误信息。如果有：返回登陆成功信息（包含user）。
    UserModel.findOne(
        {username, password: md5(password)},
        filter, //过滤，不会被返回
        (err, doc) => {
            if (doc) { //登陆成功
                res.cookie('userid', doc._id, {maxAge: 1000 * 60 * 60 * 24 * 7});
                res.send({code: 0, doc})
            } else { //登陆失败
                res.send({code: 1, msg: 'Incorrect username or password'})
            }
        });
});


module.exports = router;


// npm install --save mongoose blueimp-md5