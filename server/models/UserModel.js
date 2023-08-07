const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 
const userSchema = new Schema({
    username: {
        type: String,
        required: [true,'please add a name'],
      },
      email: {
        type: String,
        required:  [true,'please add an email'],
        unique: true,
      },
      password: {
        type: String,
        required:  [true,'please add a password'],
        minlength: 4,
      },
      isAdmin: {
        type: Boolean,
        required: false,
        default: false,
      },

},{
    timestamps:true,
});
 
module.exports = mongoose.model("User", userSchema);