const Comment = require('../models/CommentModel')


exports.getComments = async (post_id, type) => {
  return await Comment.find({ post_id, type }).populate({
    path: 'userId',
    select: '-password'
  })
}

exports.createComment = async comment => {
  return await Comment.create(comment)
}

exports.getCommentById = async id => {
  return await Comment.findById(id)
}

exports.updateComment = async (id, comment) => {
  return await Comment.findByIdAndUpdate(id, comment, { new: true }).select(
    '-userId'
  )
}

exports.deleteComment = async id => {
  return await Comment.findByIdAndDelete(id)
}
