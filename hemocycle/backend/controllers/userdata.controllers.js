const User = require('../schema/userinfo.schema')
const Image = require('../schema/images.schema')
const fs = require('fs')
const mongoose = require('mongoose')
const {drive, oAuth2Client} = require('../utils/drive.utils')
const asyncHandler = require('../utils/asyncHandler')

require('dotenv').config();
const addRecord = asyncHandler(async(req, res) => {
    const {name, gender, age, category, patientid, cncid, others} = req.body
    if(!name || !gender || !age || !category || !patientid || !cncid)
        return res.status(400).json({status:false, message: "Missing details"})

    const user = new User({name, gender, age, category, patientid, cncid, others})
    await user.save()

    return res.status(200).json({status:true, user})
})

const fetchData = asyncHandler(async(req, res) => {
    const users = await User.find().sort({createdAt: -1})
    return res.status(200).json({status: true, users})
})

const auth = asyncHandler(async(req, res) => {
    const SCOPES = ["https://www.googleapis.com/auth/drive.file"];
    const authUrl = oAuth2Client.generateAuthUrl({ access_type: 'offline', scope: SCOPES })
    res.redirect(authUrl)
})

const oauth2callback = asyncHandler(async(req, res) => {
    const code = req.query.code
    const { tokens } = await oAuth2Client.getToken(code)
    oAuth2Client.setCredentials(tokens)
    fs.writeFileSync('tokens.json', JSON.stringify(tokens))
    res.send('Authorization successful! You can now upload files.')
})

const uploadimage = asyncHandler(async (req, res) => {
    const fileId = req.fileId
    const id = req.id
    const part = req.part
    const publicurl = `https://drive.google.com/uc?id=${fileId}`
    const image = new Image({url: publicurl, uploadedBy:id, part})
    await image.save()
    const user = await User.findByIdAndUpdate(id, {$push: {images: image._id}}, {new: true}).populate('images')

    if (!user) return res.status(404).json({ success: false, message: 'User not found' })

    res.json({ success: true, fileId, user })
})

const deleteRecord = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { id } = req.body;
    if (!id) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ status: false, message: "User ID absent" });
    }

    const user = await User.findById(id).populate('images');
    if (!user) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ status: false, message: "User not found" });
    }

    const images = user.images;
    if (images && images.length > 0) {
      for (const img of images) {
        const fileId = img.url.match(/id=([^&]+)/)?.[1];
        if (fileId) {
          await drive.files.delete({ fileId });
        } else {
          throw new Error(`Invalid file URL for image ${img._id}`);
        }
      }
      await Image.deleteMany({ uploadedBy: id }, { session });
    }

    await User.findByIdAndDelete(id, { session });

    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({ status: true, message: "User and all images deleted successfully" });

  } catch (err) {
    console.error(err);
    await session.abortTransaction();
    session.endSession();
    return res.status(500).json({ status: false, message: "Internal server error" });
  }
};

const edit = asyncHandler(async(req, res) => {
    const {id, name, age, gender, category, others} = req.body;
    if(!id)
        return res.status(400).json({status: false, message: "Bad request"})
    if(!name && !age && !gender && !category)
        return res.status(200).json({status: true, message: "No change requested"})
    const user = await User.findById(id)
    if(name)
        user.name = name
    if(age)
        user.age = age
    if(gender)
        user.gender = gender
    if(category)
        user.category = category
    if(others)
        user.others = others

    await user.save()
    return res.status(200).json({status: true, user})
})

const fetchUserImages = asyncHandler(async(req, res) => {
    const id = req.body.id
    const part = req.body.part
    const user = await User.findById(id).populate('images')
    if(!user)
        return res.status(404).json({status: false, message: "User not found"})
    const images = await Image.find({uploadedBy: id, part}).sort({createdAt:-1})
    const urls = images.map(img=>img.url)
    const imageIds = images.map(image=>image._id)
    return res.status(200).json({status: true, images:urls, imageIds})
})

const deleteImage = asyncHandler(async (req, res) => {
    const { imId, id } = req.body;

    const extractFileId = (url) => {
        const match = url.match(/id=([^&]+)/);
        return match ? match[1] : null;
    };

    const image = await Image.findByIdAndDelete(imId);
    if (!image) 
        return res.status(404).json({ status: false, message: "Image not found" });

    const user = await User.findByIdAndUpdate(
        id,
        { $pull: { images: imId } },
        { new: true }
    ).populate('images', 'url');

    if (!user)
        return res.status(404).json({ status: false, message: "User not found" });

    const fileId = extractFileId(image.url);
    if (fileId) {
        await drive.files.delete({ fileId });
    }

    const imageUrls = user.images.map(img => img.url);

    return res.status(200).json({ status: true, images: imageUrls });
})

module.exports = {
    addRecord,
    fetchData,
    deleteRecord,
    uploadimage,
    auth,
    oauth2callback,
    edit,
    fetchUserImages,
    deleteImage
}