const User = require('../schema/userinfo.schema')

const addRecord = async(req, res) => {
    try {
        const {name, gender, age, category} = req.body
        if(!name || !gender || !age || !category)
            return res.status(400).json({status:false, message: "Missing details"})

        const user = new User({name, gender, age, category})
        await user.save()

        return res.status(200).json({status:true, details: {name, gender, age, category}})
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

const deleteRecord = async() => {
    try {
        const {name, age, gender} = req.body
        if(!name || !age || !gender)
            return res.status(400).json({status: false, message: "Missing details"})
        const user = await User.findOneAndDelete({name, age, gender})
        await user.save()
        return res.status(200).json({status: true, user})
    } catch(err) {
        console.log(err)
        return res.status(500).json({status: false, message: "Internal server error"})
    }
}

module.exports = {
    addRecord,
    fetchData,
    deleteRecord
}