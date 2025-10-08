const User = require('../schema/userinfo.schema')

const addRecord = async(req, res) => {
    try {
        const {name, gender, age} = req.body
        if(!name || !gender || !age)
            return res.status(400).json({status:false, message: "Missing details"})

        const user = new User({name, gender, age})
        await user.save()

        return res.status(200).json({status:true, details: {name, gender, age}})
    } catch(err) {
        console.log(err)
        return res.status(500).json({status:false, message: "Internal server error"})
    }
}

module.exports = {
    addRecord
}