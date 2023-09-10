const express = require("express");
const router= express.Router();
const { createWatched, getWatchedByUserId,deleteWatched} = require('../controllers/watchedController')
const {protect} = require('../middleware/authMiddleware');



router.route('/').post(protect, createWatched);
router.route('/:userid').get(protect, getWatchedByUserId);
router.route('/:userId/:id').delete(protect, deleteWatched);

module.exports = router;