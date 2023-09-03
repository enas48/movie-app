const express = require('express')
const router = express.Router()
const {
  getComments,
  createComment,
  updatedComment,
  deleteComment
} = require('../controllers/commentController')
const { protect } = require('../middleware/authMiddleware')

router.route('/').post(protect, createComment)
router.route('/:postId/:type').get(protect, getComments)
router
  .route('/:id')
  .put(protect, updatedComment)
  .delete(protect, deleteComment)

module.exports = router
