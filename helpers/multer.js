const multer = require('multer')
const cloudinary = require('cloudinary')
const cloudinaryStorage = require('multer-storage-cloudinary')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
})

const storage = cloudinaryStorage({
  cloudinary,
  folder: 'Carfix',
  allowedFormats: ['jpg', 'png', 'jpeg'],
  filename(req, file, cb) {
    cb(null, file.originalname)
  }
})

module.exports = multer({ storage })
