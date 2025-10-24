const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const {deleteImage,fetchUserImages,addRecord,fetchData,deleteRecord, uploadimage, auth, oauth2callback, edit} = require('../controllers/userdata.controllers')
const {uploadimageToDrive} = require('../middlewares/user.middlewares')

router.post('/addinfo', addRecord)
router.get('/fetchdata', fetchData)
router.delete('/deleterecord', deleteRecord)
router.get('/auth', auth)
router.get('/oauth2callback', oauth2callback)
router.post('/upload', upload.single('file'),uploadimageToDrive, uploadimage)
router.patch('/edit', edit)
router.post('/images', fetchUserImages)
router.delete('/delimage', deleteImage)

module.exports = router