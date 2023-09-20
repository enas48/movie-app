const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotificationSchema = new Schema(
  {
   
  
    userId: { type: mongoose.Schema.Types.ObjectId, require: true ,   ref: "User"},
    title: { type: String, require: true },
    type: { type: Number, required: true },
    text: { type: String, require: true },
    read: { type: Boolean, default: false },
 
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Notification", NotificationSchema);
