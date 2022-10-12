// const path = require('path')
// const cloudinaryTest = require('cloudinary').v2
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinaryUpload = require('./cloudinary');

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(global.__basepath, 'assets', 'images'))
//   },
//   filename: (req, file, cb) => {
//     const timestamp = new Date().getTime()
//     const ext = file.mimetype.split('/')[1]
//     cb(null, `${timestamp}.${ext}`)
//   }
// })

const storage = new CloudinaryStorage({
  cloudinary: cloudinaryUpload,
  params: {
    folder: 'rewallet',
    format: async (req, file) => 'png',
    public_id: (req, file) => new Date().getTime(),
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 4 * 1000 * 1000,
  },
  fileFilter: (req, file, cb) => {
    const allowExt = ['image/jpg', 'image/png', 'image/jpeg'];
    if (allowExt.includes(file.mimetype)) {
      cb(null, true);
    } else {
      const err = new Error('Extension not supported');
      cb(err, false);
    }
  },
});

module.exports = upload;
