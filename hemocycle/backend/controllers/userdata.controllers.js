const User = require('../schema/userinfo.schema')

const addData = async(req, res) => {
    try {
        const {name, category} = req.body
        if(!name || !category)
            return res.status(400).json({status:false, message: "Missing details"})

        const user = new User({name, category})
        await user.save()

        return res.status(200).json({status:true, details: {name, category}})
    } catch(err) {
        console.log(err)
        return res.status(500).json({status:false, message: "Internal server error"})
    }
}

module.exports = {
    addData
}