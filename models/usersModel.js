const db = require('../config/database')


function getUsers() {
    return new Promise((resolve, reject) => {
        db.query('SELECT * from users', (err, result) => {
            if (err) reject(err)
            resolve(result)
        })
    })
}

function userAvatar() {
    return new Promise((resolve, reject) => {
        (error, result) => {
            if (error) reject(error)
            db.query(`INSERT INTO users (image) VALUES ('${result.url}')`, (err, result) => {
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

const usersModel = {
    getUsers: getUsers,
    userAvatar: userAvatar
}

module.exports = usersModel