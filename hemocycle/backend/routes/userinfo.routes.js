const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const {addRecord,fetchData,deleteRecord, uploadimage, auth, oauth2callback} = require('../controllers/userdata.controllers')

router.post('/addinfo', addRecord)
router.get('/fetchdata', fetchData)
router.delete('/deleterecord', deleteRecord)
router.get('/auth', auth)
router.get('/oauth2callback', oauth2callback)
router.post('/upload', upload.single('file'), uploadimage)

module.exports = router