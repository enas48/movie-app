const mongoose = require('mongoose')
const Schema = mongoose.Schema

const profileSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    image: String
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Profile', profileSchema)
