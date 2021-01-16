const db = require('../config/database')

function Login(email, password) {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM users WHERE email = '${email}'`, (err, ress) => {
            if (err) reject(err);

            if (ress.length > 0) {
                if (password === ress[0].password) {
                    resolve(ress[0])
                }
            } else {
                reject('User not found!')
            }
        })
    })
}

function Register(u) {
    return new Promise((resolve, reject) => {
        const sqlInsert = `INSERT INTO users (name, last_name, email, password, role) VALUES ('${u.name}', '${u.last_name}', '${u.email}', '${u.password}', '${u.role}')`;
        if (req.body.email != '' && req.body.email) {
            db.query(`SELECT * FROM users WHERE email = '${u.email}'`, (err, ress) => {
                if (err) reject(err);

                if (ress.length > 0) {
                    reject('Email already exists!')
                }
                db.query(sqlInsert, (err, result) => {
                    if (err) reject(err);

                    resolve(result)
                })
            })

        }
    })
}

const authentificationModel = {
    Login: Login,
    Register: Register
} 


module.exports = authentificationModel