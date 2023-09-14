const express = require('express')
const router = express.Router()
const dotenv = require('dotenv').config();
const {
  getProfileByUserId,
  getProfileById,
  updatedProfile
} = require('../controllers/profileController')
const { protect } = require('../middleware/authMiddleware')

const multer = require('multer')
const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')

// Configuration
cloudinary.config({
  cloud_name: 'disyammlp',
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'demo',
  allowedFormats: ['jpg', 'png'],
  transformation: [{ width: 500, height: 500, crop: 'limit' }]
})
const parser = multer({ storage: storage })

router.route('/:id').get(getProfileById).put( parser.fields([{name:'image',maxCount:1},
{name:'bgImage',maxCount:1},

]), protect, updatedProfile)
router.route('/users/:userid').get(getProfileByUserId)

module.exports = router
 