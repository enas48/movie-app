const express = require("express");
const router= express.Router();
const { createBookmark, getBookmarksByUserId,deleteBookmark} = require('../controllers/bookmarkController')
const {protect} = require('../middleware/authMiddleware');



router.route('/').post(protect, createBookmark);
router.route('/:userid').get(protect, getBookmarksByUserId);
router.route('/:id').delete(protect, deleteBookmark);

module.exports = router;