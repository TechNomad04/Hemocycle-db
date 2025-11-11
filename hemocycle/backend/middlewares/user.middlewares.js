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
                folderId = '1hZr_bFm0RLsct1-8MOLlCTDvtGV68XNe'
            else if (category == 'Mild')
                folderId = '1r5JqUKj0v5mGF7aaktDzimbOJ-kBa9Yy'
            else 
                folderId = '16jtx5B18gEfJYuEP8ExT3Y1TgQ3qaR8e'
        } else if (part == 'Fingernails') {
            if(category == 'Non-Anemic')
                folderId = '1fWZaeZApKZoakvntjxqQIqshZg6w86hM'
            else if (category == 'Mild')
                folderId = 'O6MM4Ic_a4TBX3OwUfzMEkWisqZwPgHV'
            else 
                folderId = '1usyyw_wdvwC6qpaGrI_0oUQcX9YLYKwP'
        } else {
            if(category == 'Non-Anemic')
                folderId = '1zdsQCSlTsVClFgCKZXO-D-xfA3v73A1I'
            else if (category == 'Mild')
                folderId = '1JS23PwzP5-tbZJivUHwo2raFgHa67n_A'
            else 
                folderId = '1U2L1YZ7-_Nz-aTlcY8P-n7SK5cOd_8t0'
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