const commentService = require('../services/commentService')
const User = require('../models/UserModel')
const HttpError = require('../middleware/errorMiddleware')

// @desc get comments by post_id and type
//@route GET /comments/:type/:postId
//@access private
const getComments = async (req, res, next) => {
  try {
    const comments = await commentService.getComments(
      req.params.postId.toString(),
      req.params.type
    )

    res.status(200).json({
      comments: comments,
      message: `find comment by post id ${req.params.postId} and type ${req.params.type}`
    })
  } catch (err) {
    const error = new HttpError(err.message, 500)
    return next(error)
  }
}

// @desc create comment
//@route POST /comments
//@access private
const createComment = async (req, res, next) => {
  try {
    const { userId, text, post_id,fullName,avatarUrl, type, replies ,parentCommentId} = req.body
    const comment = await commentService.createComment({
      userId: userId,
      text,
      post_id,
      fullName,
      avatarUrl,
      type,
      parentCommentId
      // replies: replies
    })
    res
      .status(200)
      .json({ comment: comment, message: 'comment Added Successfully' })
  } catch (err) {
    const error = new HttpError(err.message, 500)
    return next(error)
  }
}

// @desc update comment
//@route put /comments/:id
//@access private
const updatedComment = async (req, res, next) => {
  try {
    const { userId, text, replies,parentCommentId } = req.body
    const comment = await commentService.getCommentById(req.params.id)
    if (!comment) {
      const error = new HttpError('comment not found', 400)
      return next(error)
    } else {
      if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
        // Yes, it's a valid ObjectId, proceed with `findById` call.
        const error = new HttpError('user not found', 401)
        return next(error)
      }
      const user = await User.findById(userId)
      //check for  user
      if (!user) {
        const error = new HttpError('user not found', 401)
        return next(error)
      }
      //make sure user is logged in match comment user
      if (comment.userId._id.toString() !== user._id.toString()) {
        const error = new HttpError('user not authorized', 401)
        return next(error)
      }

      const updatedComment = await commentService.updateComment(req.params.id, {
        text,
        parentCommentId
        // replies: replies
      })

      res.status(200).json({
        comment: updatedComment,
        message: `comment updated successfully`,
        status: 200
      })
    }
  } catch (err) {
    const error = new HttpError(err.message, 500)
    return next(error)
  }
}

// @desc delete comment
//@route delete /comments/:id
//@access private
const deleteComment = async (req, res, next) => {
  try {
    const comment = await commentService.getCommentById(req.params.id)
    if (!comment) {
      const error = new HttpError('comment not found', 400)
      return next(error)
    } else {
      await commentService.deleteComment(req.params.id)
      res.status(200).json({ message: `comment deleted successfully` })
    }
  } catch (err) {
    const error = new HttpError(err.message, 500)
    return next(error)
  }
}

module.exports = {
  getComments,
  createComment,
  updatedComment,
  deleteComment
}
