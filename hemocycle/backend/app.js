const express = require('express')
const app = express()
const {connectdb} = require('./db')
require('dotenv').config()

app.use(express.json())
connectdb().then(() => {
    app.listen(process.env.PORT, () => console.log("Server and database connected"))
}).catch(err => console.log(err))
app.listen(process.env.PORT || 5000, () => console.log("Server started"))