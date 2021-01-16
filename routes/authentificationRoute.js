const authentificationModel = require('../models/authentificationModel')

function init(router) {
    router.route('/login').post(Login)
    router.route('/register').post(Register)
}

function Login(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    authentificationModel.Login(email, password).then((data) => {

        res.json({
            success: true,
            data: data
        })
    })
}

function Register(req, res) {
    var u = req.body;
    authentificationModel.Login(u).then((data) => {

        res.json({
            success: true,
            data: data
        })
    })
}

module.exports.init = init; 