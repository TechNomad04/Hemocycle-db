const express = require('express')
const app = express()
const {connectdb} = require('./db')
const userinfoRoutes = require('./routes/userinfo.routes')
require('dotenv').config()

app.use(express.json())

app.use('/', userinfoRoutes)
connectdb().then(() => {
    app.listen(process.env.PORT, '0.0.0.0', () => console.log("Server and database connected"))
}).catch(err => console.log(err))