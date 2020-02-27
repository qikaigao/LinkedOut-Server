var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

// 注册一个路由： 用户注册
router.post('/register', function (req, res, next) {//callback函数
    // 获取请求参数
    const {username, password} = req.body;
    // 处理
    if (username === 'admin') { //注册失败
        // 返回响应数据-失败
        res.send({code:1,msg:'this user is already exist'});
    } else {//注册成功
        // 返回响应数据-成功
        res.send({code: 0, data: {_id: 'absssc',username, password}});
    }
});


module.exports = router;


// npm install --save mongoose blueimp-md5