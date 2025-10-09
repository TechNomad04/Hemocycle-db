const express = require('express')
const router = express.Router()
const {addRecord,fetchData} = require('../controllers/userdata.controllers')

router.post('/addinfo', addRecord)
router.get('/fetchdata', fetchData)

module.exports = router