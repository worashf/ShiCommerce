const mongoose = require('mongoose');
const validator = require('validator');
const bcrpt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require("crypto")
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please Enter your name'],
    maxLength: [30, 'Your name cannot bet exceed 30 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    unique: true,
    validate: [validator.isEmail, 'Please enter valid email address'],
  },
  password: {
    type: String,
    required: [true, 'Please enter your password'],
    minLength: [6, 'Your password must be longer than 6 characters'],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: { type: String, required: true },
  },
  role: {
    type: String,
    default: 'user',
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

//Encrypting password before saving the user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  this.password = await bcrpt.hash(this.password, 10);
});

// compare user password
userSchema.methods.comparePassword = async function (
  enteredPassword
) {
  return await bcrpt.compare(enteredPassword, this.password)
}
userSchema.methods.JsonWebToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });
};

//  Generate password reset token
userSchema.methods.getResetPasswordToken = function () {
  //generate token
  const resetToken = crypto.randomBytes(20).toString("hex");
  // encrypt  and set to resetPasswordToken
  this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex") 
// set token expire time 
  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;
   return resetToken
}
module.exports = mongoose.model('User', userSchema);
