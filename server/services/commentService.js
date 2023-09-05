const Comment = require('../models/CommentModel')


exports.getComments = async ( type,postId) => {
  return await Comment.find({ type,post_id:postId })
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
exports.deleteManyComment=async id=>{
  return await Comment.deleteMany({parentCommentId:id})
}