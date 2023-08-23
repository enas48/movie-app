const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favouriteSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    favourite_id:String,
    type:String
 
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("favourite", favouriteSchema);
