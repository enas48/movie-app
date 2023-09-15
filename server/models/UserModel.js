const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'please add a name']
    },
    email: {
      type: String,
      required: [true, 'please add an email'],
      unique: true
    },
    password: {
      type: String,
      required: [true, 'please add a password'],
      minlength: 4
    },
    isBlocked: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },

    isVerified: { type: Boolean, default: false },
    followers: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    ],
    following: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    ]
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('User', userSchema)
