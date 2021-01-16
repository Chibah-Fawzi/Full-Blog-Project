const articleModel = require('../models/usersModel')
var multer = require('multer')
const cloudinary = require('../config/cloudinary')

var upload = multer({ dest: __dirname + '/uploads' })

function init(router) {
    router.route('/users').get(getUsers)
        .post(upload.single('avatar'), userAvatar)
}


function getUsers(req, res) {
    articleModel.getUsers().then((data) => {
        res.json({
            success: true,
            users: data
        })
    })
}
function userAvatar(req, res) {
    cloudinary.uploader.upload(__dirname + "/img/radik.png",
        {
            resource_type: "image", public_id: "img/radik.png",
            overwrite: true
        },
        usersModel.userAvatar().then((data) => {
            res.json({
                success: true,
                articles: data
            })
        })
    )
}


module.exports.init = init; 