const express = require('express')
const app = express()
const port = 3005
const bodyParser = require('body-parser')
const articleRoute = require('./routes/articleRoute')
const usersRoute = require('./routes/usersRoute')
const authentificationRoute = require('./routes/authentificationRoute')


const router = express.Router()
articleRoute.init(router)
authentificationRoute.init(router)
usersRoute.init(router)

app.use('/', router)

app.use(bodyParser.json());

app.listen(port, () => console.log(`Example app listening on port ${port}!`))