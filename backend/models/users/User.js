
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },

  email: { 
    type: String, 
    required: true, 
    unique: true 
  },

  passwordHash: { 
    type: String, 
    required: true 
  },

  role: {
    type: String,
    enum: ["admin", "user", "driver"],
    default: "user"
  },

  phone: { type: String },
  address: { type: String },


});

// Compare passwords
userSchema.methods.validatePassword = function (password) {
  return bcrypt.compare(password, this.passwordHash);
};

module.exports = mongoose.model("User", userSchema);
