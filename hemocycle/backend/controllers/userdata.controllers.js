const User = require('../schema/userinfo.schema')
const { google } = require('googleapis')
const fs = require('fs')
require('dotenv').config();
const addRecord = async(req, res) => {
    try {
        const {name, gender, age, category} = req.body
        if(!name || !gender || !age || !category)
            return res.status(400).json({status:false, message: "Missing details"})

        const user = new User({name, gender, age, category})
        await user.save()

        return res.status(200).json({status:true, user})
    } catch(err) {
        console.log(err)
        return res.status(500).json({status:false, message: "Internal server error"})
    }
}

const fetchData = async(req, res) => {
    try {
        const users = await User.find().sort({createdAt: -1})
        return res.status(200).json({status: true, users})
    } catch (err) {
        console.log(err)
        return res.status(500).json({status: false, message: "Internal server error"})
    }
}

const deleteRecord = async(req, res) => {
    try {
        const id = req.body.id;
        if(!id)
            return res.status(400).json({status: false, message: "User id absent"})

        const user = await User.findByIdAndDelete(id)
        if(!user)
            return res.status(404).json({status: false, message: "User not found"})

        return res.status(200).json({status: true, user})
    } catch(err) {
        console.log(err)
        return res.status(500).json({status: false, message: "Internal server error"})
    }
}

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIRECT_URI = `http://localhost:5000/oauth2callback`

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
const SCOPES = ['https://www.googleapis.com/auth/drive.file']

if (fs.existsSync('tokens.json')) {
    const tokens = JSON.parse(fs.readFileSync('tokens.json'))
    oAuth2Client.setCredentials(tokens)
}

const auth = async(req, res) => {
    const authUrl = oAuth2Client.generateAuthUrl({ access_type: 'offline', scope: SCOPES })
    res.redirect(authUrl)
}

const oauth2callback = async(req, res) => {
    const code = req.query.code
    const { tokens } = await oAuth2Client.getToken(code)
    oAuth2Client.setCredentials(tokens)
    fs.writeFileSync('tokens.json', JSON.stringify(tokens))
    res.send('Authorization successful! You can now upload files.')
}

const uploadimage = async (req, res) => {
    try {
        const id = req.body.id;
        
        const drive = google.drive({ version: 'v3', auth: oAuth2Client })
        const filePath = req.file.path
        const fileName = req.file.originalname

        const folderId = '1PuMvCtVIUdXtH4xALE4lJryn1R1vi000'

        const response = await drive.files.create({
            requestBody: {
                name: fileName,
                parents: [folderId],
            },
            media: {
                mimeType: req.file.mimetype,
                body: fs.createReadStream(filePath),
            },
            fields: 'id, name, parents',
        })

        fs.unlinkSync(filePath)
        const fileId = response.data.id
        const publicurl = `https://drive.google.com/uc?id=${fileId}`
        const user = await User.findByIdAndUpdate(id, {$push: {images: publicurl}}, {new: true})

        if (!user) return res.status(404).json({ success: false, message: 'User not found' })

        res.json({ success: true, fileId: response.data.id, name: response.data.name, user })
    } catch (err) {
        console.error(err)
        res.status(500).json({ success: false, error: err.message })
    }
}

module.exports = {
    addRecord,
    fetchData,
    deleteRecord,
    uploadimage,
    auth,
    oauth2callback
}