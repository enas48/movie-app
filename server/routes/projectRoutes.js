const express = require("express");
const router= express.Router();
const {getProjects, createProject,getProjectById, updateProject, deleteProject} = require('../controllers/projectController')
const {protect} = require('../middleware/authMiddleware');


const multer = require("multer");
const cloudinary = require("cloudinary").v2;;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configuration 
cloudinary.config({
  cloud_name: "disyammlp",
  api_key: "742911561294192",
  api_secret: "Lp6jbKIKIbRdz4s3pOI8JFUxGQU"
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: "demo",
  allowedFormats: ["jpg", "png"],
  transformation: [{ width: 500, height: 500, crop: "limit" }]
  });
  const parser = multer({ storage: storage });

router.route('/').get(getProjects).post( parser.single('image'), protect, createProject);
router.route('/:id').get(getProjectById).put(parser.single('image'),protect, updateProject).delete(protect, deleteProject);

module.exports = router;