const express = require('express')
const router = express.Router()
const {
  getComments,
  createComment,
  updatedComment,
  deleteComment,
  updatedLike
} = require('../controllers/commentController')
const { protect } = require('../middleware/authMiddleware')

router.route('/').post(protect, createComment)
router.route('/:type/:postId').get( getComments)
router
  .route('/:id')
  .put(protect, updatedComment)
  .delete(protect, deleteComment)
  router
  .route('/:type/:id')
  .put(protect, updatedLike)
module.exports = router
