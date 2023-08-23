const express = require("express");
const router= express.Router();
const { createFavourite, getFavouritesByUserId,deleteFavourite} = require('../controllers/favouriteController')
const {protect} = require('../middleware/authMiddleware');



router.route('/').post(protect, createFavourite);
router.route('/:userid').get(protect, getFavouritesByUserId);
router.route('/:userId/:id').delete(protect, deleteFavourite);

module.exports = router;