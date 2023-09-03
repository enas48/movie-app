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
    date: {
      type: Date,
      default: Date.now
    },
    post_id: String,
    type: String,
    fullName: String,
    avatarUrl: String,
    replies: [
      {
        text: {
          type: String,
          trim: true
        },
        fullName: String,
        avatarUrl: String,
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'User'
        },
        date: {
          type: Date,
          default: Date.now
        },
        default: []
      },
    ]
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Comment', commentSchema)
