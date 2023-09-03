const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    text: {
      type: String,
      trim: true,
      required: true
    },
    post_id: String,
    type: String,
    fullName: String,
    avatarUrl: String,
    parentCommentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
      default:null,
      required: false, // if not populated, then its a top level comment
    },
    date: {
      type: Date,
      default: Date.now
    },
    // replies: [
    //   {
    //     text: {
    //       type: String,
    //       trim: true
    //     },
    //     fullName: String,
    //     avatarUrl: String,
    //     userId: {
    //       type: mongoose.Schema.Types.ObjectId,
    //       required: true,
    //       ref: 'User'
    //     },
    //     date: {
    //       type: Date,
    //       default: Date.now
    //     },
    //     default: []
    //   },
    // ]
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Comment', commentSchema)
