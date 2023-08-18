const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookmarkSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    bookmark_id:String,
    type:String
 
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Bookmark", bookmarkSchema);
