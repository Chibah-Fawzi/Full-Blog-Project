const articleModel = require('../models/articleModel')
const cloudinary = require('../config/cloudinary')

var multer = require('multer')

var upload = multer({ dest: __dirname + '/uploads' })

function init(router) {
    router.route('/articles').get(getAllArticles)
        .post(upload.single('image'), postArticles)
    router.route('/articles/:id').get(getArticlesById)
    router.route('/articles/:id/comments').post(postComments)
    router.route('/article/:id/comments/likes').put(likeComments)
    router.route('/articles/:id').put(likeArticles)
}

function getAllArticles(req, res) {
    articleModel.getAllArticles().then((data) => {
        res.json({
            success: true,
            articles: data
        })
    })
}

function postArticles(req, res) {
    var u = req.body;
    cloudinary.uploader.upload(__dirname + "/img/radik.png",
        {
            resource_type: "image", public_id: "img/radik.png",
            overwrite: true
        },
        articleModel.postArticles(u).then((data) => {
            res.json({
                success: true,
                articles: data
            })
        })
    )
}

function getArticlesById(req, res) {
    var id = req.params.id;

    articleModel.getArticlesById(id).then((data) => {
        res.json({
            success: true,
            articleId: data
        })
    })
}

function postComments(req, res) {
    var u = req.body;
    var id = req.params.id

    articleModel.postComments(id, u).then((data) => {
        res.json({
            success: true,
            comment: data
        })
    })
}

function likeComments(req, res) {
    var id = req.params.id
    var commentId = req.body.id

    articleModel.likeComments(id, commentId).then((data) => {
        res.json({
            success: true,
            like: data
        })
    })
}

function likeArticles(req, res) {
    var id = req.params.id;

    articleModel.likeArticles(id).then((data) => {
        res.json({
            success: true,
            like: data
        })
    })
}

module.exports.init = init; 