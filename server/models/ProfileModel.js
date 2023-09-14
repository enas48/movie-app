const mongoose = require('mongoose')
const Schema = mongoose.Schema

const profileSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    profileImage: {
      type: String,
      default: ''
    },
    coverImage: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Profile', profileSchema)
