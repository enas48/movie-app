const commentService = require("../services/commentService");
const User = require("../models/UserModel");
const HttpError = require("../middleware/errorMiddleware");
const main = require("../index");

// @desc get comments by post_id and type
//@route GET /comments/:type/:postId
//@access private
const getComments = async (req, res, next) => {
  try {
    const comments = await commentService.getComments(
      req.params.type,
      req.params.postId
    );

    res.status(200).json({
      comments: comments,
      message: `find comment by post id ${req.params.postId} and type ${req.params.type}`,
    });
  } catch (err) {
    const error = new HttpError(err.message, 500);
    return next(error);
  }
};

// @desc create comment
//@route POST /comments
//@access private
const createComment = async (req, res, next) => {
  try {
    const { userId, text, post_id, type, parentCommentId } = req.body;
    const comment = await commentService.createComment({
      userId: userId,
      text,
      post_id,
      type,
      parentCommentId,
    });
    main.io.emit("add-comment", comment);
    res
      .status(200)
      .json({ comment: comment, message: "comment Added Successfully" });
  } catch (err) {
    const error = new HttpError(err.message, 500);
    return next(error);
  }
};

// @desc update comment
//@route put /comments/:id
//@access private
const updatedComment = async (req, res, next) => {
  try {
    const { userId, text } = req.body;
    const comment = await commentService.getCommentById(req.params.id);
    if (!comment) {
      const error = new HttpError("comment not found", 400);
      return next(error);
    } else {
      if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
        // Yes, it's a valid ObjectId, proceed with `findById` call.
        const error = new HttpError("user not found", 401);
        return next(error);
      }
      const user = await User.findById(userId);
      //check for  user
      if (!user) {
        const error = new HttpError("user not found", 401);
        return next(error);
      }
      //make sure user is logged in match comment user
      if (comment.userId._id.toString() !== user._id.toString()) {
        const error = new HttpError("user not authorized", 401);
        return next(error);
      }

      const updatedComment = await commentService.updateComment(req.params.id, {
        text,
      });
      if (res.statusCode === 200) {
        const comments = await commentService.getComments(
          req.body.type,
          req.body.post_id
        );
        main.io.emit("update-comment", comments);
      }
      res.status(200).json({
        comment: updatedComment,
        message: `comment updated successfully`,
        status: 200,
      });
    }
  } catch (err) {
    const error = new HttpError(err.message, 500);
    return next(error);
  }
};

// @desc update comment
//@route put /comments/:type/:id
//@access private
const updatedLike = async (req, res, next) => {
  const type = req.params.type;

  try {
    const { userId } = req.body;
    const comment = await commentService.getCommentById(req.params.id);
    if (!comment) {
      const error = new HttpError("comment not found", 400);
      return next(error);
    } else {
      if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
        // Yes, it's a valid ObjectId, proceed with `findById` call.
        const error = new HttpError("user not found", 401);
        return next(error);
      }
      const user = await User.findById(userId);
      //check for  user
      if (!user) {
        const error = new HttpError("user not found", 401);
        return next(error);
      }

      // /comments/like/:id
      if (type === "like") {
        let updatedComment = await commentService.updateComment(req.params.id, {
          $push: { likes: userId },
        });

        res.status(200).json({
          comment: updatedComment,
          message: `comment updated successfully`,
          status: 200,
        });
      }
      // /comments/unlike/:id
      else if (type === "unlike") {
        let updatedComment = await commentService.updateComment(req.params.id, {
          $pull: { likes: userId },
        });

        res.status(200).json({
          comment: updatedComment,
          message: `comment updated successfully`,
          status: 200,
        });
      }
      if (res.statusCode === 200) {
        const comments = await commentService.getComments(
          req.body.type,
          req.body.post_id
        );
        main.io.emit("update-comment", comments);
      }
    }
  } catch (err) {
    const error = new HttpError(err.message, 500);
    return next(error);
  }
};

// @desc delete comment
//@route delete /comments/:id
//@access private
const deleteComment = async (req, res, next) => {
  try {
    const comment = await commentService.getCommentById(req.params.id);
    if (!comment) {
      const error = new HttpError("comment not found", 400);
      return next(error);
    } else {
      await commentService.deleteComment(req.params.id);
      if (res.statusCode === 200) {
        //delete replies
        await commentService.deleteManyComment(req.params.id);
        const comments = await commentService.getComments(
          req.body.type,
          req.body.post_id
        );
        main.io.emit("delete-Comment", comments);
        res.status(200).json({ message: `comment deleted successfully` });
      }
    }
  } catch (err) {
    const error = new HttpError(err.message, 500);
    return next(error);
  }
};

module.exports = {
  getComments,
  createComment,
  updatedComment,
  deleteComment,
  updatedLike,
};
