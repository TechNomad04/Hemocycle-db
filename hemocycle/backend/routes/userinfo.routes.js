const express = require('express')
const router = express.Router()
const {addRecord} = require('../controllers/userdata.controllers')

router.post('/addinfo', addRecord)

module.exports = router