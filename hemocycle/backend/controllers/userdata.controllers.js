const addData = async(req, res) => {
    try {
        const {name, category} = req.body
        
    } catch(err) {
        console.log(err)
        return res.status(500).json({status:false, message: "Internal server error"})
    }
}