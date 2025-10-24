const errHandler = async(err, req, res) => {
    console.log(err)
    return res.status(500).json({status: false, message: "Internal server error"})
}

module.exports = {
    errHandler
}