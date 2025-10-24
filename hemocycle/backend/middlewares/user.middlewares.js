const User = require('../schema/userinfo.schema')
const {drive} = require('../utils/drive.utils')
const fs = require('fs')

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