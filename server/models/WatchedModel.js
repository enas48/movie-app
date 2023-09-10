const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const watchedSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    watched_id:String,
    type:String
 
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Watched", watchedSchema);
