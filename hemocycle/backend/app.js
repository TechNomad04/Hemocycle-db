const express = require('express')
const app = express()
const {errHandler} = require('./middlewares/errhandler')
const cors = require('cors')
const {connectdb} = require('./db')
const userInfoRoutes = require('./routes/userinfo.routes')
require('dotenv').config()
app.use(cors())
app.use(express.json())

app.use('/', userInfoRoutes)

app.use(errHandler)

connectdb().then(() => {
  const PORT = process.env.PORT || 5000
  app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`))
}).catch((err) => console.log(err))
