const fs = require('fs')
const { google } = require('googleapis')

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIRECT_URI = `http://localhost:5000/oauth2callback`

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
const drive = google.drive({ version: 'v3', auth: oAuth2Client })

// if (fs.existsSync('tokens.json')) {
//     const tokens = JSON.parse(fs.readFileSync('tokens.json'))
//     oAuth2Client.setCredentials(tokens)
// }

if (process.env.TOKENS_JSON) {
  const tokens = JSON.parse(process.env.TOKENS_JSON);
  oAuth2Client.setCredentials(tokens);
}

const User = require('../schema/userinfo.schema')

const uploadimageToDrive = async (req, res, next) => {
    try {
        const id = req.body.id;
        const part = req.body.part
        const filePath = req.file.path
        const fileName = req.file.originalname
        let folderId
        const category = (await User.findById(id)).category
        if(!category)
            return res.status(404).json({status: false, message: "User doesn't exist"})
        if (part == 'Conjunctiva') {
            if(category == 'Non-Anemic')
                folderId = '1ZbzorldZEoC16makUAZKDKqvZP_MY0IU'
            else if (category == 'Mild')
                folderId = '12jDT8YwhoK-q1ZcjpNcJpWaYjiYKcwOc'
            else 
                folderId = '1n7OKWiUKrTcwtR44JXuxqYetnLt0qJCe'
        } else if (part == 'Fingernails') {
            if(category == 'Non-Anemic')
                folderId = '1mFrcD5vh6OC93u2DXVgUVKpQgp6gxT6G'
            else if (category == 'Mild')
                folderId = '1SOOfg0YAcC95JoWmg520YVw_g6zhVHDa'
            else 
                folderId = '1KW360HS86LLGkX7Su_07e3c3GMVjQna5'
        } else {
            if(category == 'Non-Anemic')
                folderId = '1dxBgCNg705XZRWcnHjufDDCd7xtycmjf'
            else if (category == 'Mild')
                folderId = '1TmLsVTdWy4BJQpmWLRCSqoBMQSkR-ceW'
            else 
                folderId = '1ogM2qiBz3iBDzaPdt6Cu_mD2NK06z6ZT'
        }

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

        req.fileId = fileId
        req.id = id
        req.part = part
        next()
    } catch (err) {
        console.log(err)
        return res.status(500).json({status: false, message: "Internal server error"})
    }
}

module.exports = {
    uploadimageToDrive
}