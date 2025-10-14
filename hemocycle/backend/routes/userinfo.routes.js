const express = require('express')
const router = express.Router()
const {addRecord,fetchData,deleteRecord} = require('../controllers/userdata.controllers')

router.post('/addinfo', addRecord)
router.get('/fetchdata', fetchData)
router.delete('/deleterecord', deleteRecord)

module.exports = router