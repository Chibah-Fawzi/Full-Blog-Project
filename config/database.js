const mysql = require('mysql')


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: '3307',
    password: '',
    database: 'test'
})

module.exports = db