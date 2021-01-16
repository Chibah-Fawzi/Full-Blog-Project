const db = require('../config/database')

function getAllArticles() {
    return new Promise((resolve, reject) => {
        const sqlSelect = "SELECT * from articles"
        db.query(sqlSelect, (err, result) => {
            if (err) reject(err)

            resolve(result)
        })
    })
}

function postArticles(u) {
    return new Promise((resolve, reject) => {

        (error, result) => {
            if (error) reject(error)

            const sqlInsert = `INSERT INTO articles (title, description, created_at, image) VALUES ('${u.title}', '${u.description}', '${u.created_at}', '${result.url}')`;
            db.query(sqlInsert, (err, result) => {
                if (err) {
                    reject({
                        success: false,
                        message: err
                    })
                    resolve(result);
                }
            })
        }
    })
}

function getArticlesById(id) {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * from articles WHERE id = ${id}`, (err, result) => {
            if (err) reject(err)

            db.query(`SELECT * from comments where article_id= ${result[0].id}`, (err2, ress) => {
                if (err2) reject(err2)
                resolve({
                    article: result[0],
                    comments: ress
                });
            })
        })
    })
}

function postComments(u, id) {
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO comments (content, likes, article_id) VALUES ('${u.content}', '${u.likes}','${id}')`, (err, result) => {
            if (err) {
                reject({
                    success: false,
                    message: err
                })
            }
            resolve(result)
        })
    })
}

function likeComments(commentId, id) {
    return new Promise((resolve, reject) => {
        db.query(`UPDATE comments SET likes = likes +1 WHERE article_id=${id} AND id=${commentId}`, (err, ress) => {
            if (err) reject(err)
            resolve(ress);
        })
    })
}

function likeArticles(id) {
    return new Promise((resolve, reject) => {

        db.query(`UPDATE articles SET likes = likes +1 WHERE id=${id}`, (err, result) => {
            if (err) {
                reject({
                    success: false,
                    message: err
                })
            }
            resolve(result);
        })
    })
}
const articleModel = {
    getAllArticles: getAllArticles,
    postArticles: postArticles,
    getArticlesById: getArticlesById,
    postComments: postComments,
    likeComments: likeComments,
    likeArticles: likeArticles

}

module.exports = articleModel