const express = require('express')
const router = express.Router()
const {addData} = require('../controllers/userdata.controllers')

router.post('/addinfo', addData)

module.exports = router