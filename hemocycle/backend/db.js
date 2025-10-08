const mongoose = require('mongoose')

const connectdb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Mongoose connected successfully")
  } catch (err) {
    console.error("Mongoose connection error:", err)
    throw err
  }
}

module.exports = { connectdb }
