const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotificationSchema = new Schema(
  {
    senderUser: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    type: { type: String, required: true },
    text: { type: String, require: true },
    read: { type: Boolean, default: false },
    link: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Notification", NotificationSchema);
