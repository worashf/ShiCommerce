 const crypto = require("crypto")
 const cloudinary  = require("cloudinary")
const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncError');
const sendtoken = require("../utils/jwtToken");
const sendEmail = require('../utils/sendMail');
const user = require("../models/user");
//Signup new user  /api/v1/register
exports.registerUser = catchAsyncError(async (req, res, next) => {

  const result = await cloudinary.v2.uploader.upload(req.body.avatar)
  const { name, email, password } = req.body;


  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: result.public_id,
      url: result.url
    }, 
  });
sendtoken(user, 200,res)
});

// Login user /api/v1/login
exports.loginUser = 
catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body
  console.log(email, password)
  // check if email and password entered by user
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email & password",400))
  }
  // find user in database
  const user = await User.findOne({ email }).select("+password")
  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password",401))
  }
 // checks if password is correct or not 
  const isPasswordMatched = await user.comparePassword(password)
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password",401))
  }
  sendtoken(user, 200,res)
})

//Forgot Password => /api/v1/password/forgot
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email })
  if (!user) {
     return next(new ErrorHandler("User not found with this email",404))
  }
  // Get reset token
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false })
  // create password reset url
  const resetUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`
  // create message to send
  const message = `Your password reset token is as follow:\n\n ${resetUrl}\n\n if you have not requested this email, then ignore it.`
  try {
    await sendEmail({
      email: user.email,
      subject: "ShiShop password recovery",
      message
  })
    res.status(200).json({
      success: true,
      message: `Email sent to: ${user.email}`
 })
  }
  catch (err) {
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined
    await user.save({validateBeforeSave:false})
return next(new ErrorHandler(err.message,500) )
  }
})

// Reset Password => /api/v1/password/reset/:token

exports.resetPassword = catchAsyncError(async (req, res, next) => {
  //Hash url token
 const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex")
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
  })
  if (!user) {
    return next(new ErrorHandler("Password reset token is invalid or has expired!",400))
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next( new ErrorHandler("Password does not match", 400))
  }
  // set up  new password
  user.password = req.body.password
  user.resetPasswordToken = undefined
  user.resetPasswordExpire = undefined
  await user.save()
  sendtoken(user,200, res)
})


// Get currently logged in user details => /api/v1/me
exports.getUserProfile = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id)
  res.status(200).json({
    success: true,
    user
   })
})

// Uppdate / change password  =>  /api/v1/password/update
exports.updatePassword = catchAsyncError(async (req, res, next) => {
   const  user = await User.findById(req.user.id).select('+password')
  // check previous user password  
  const isMatched = await user.comparePassword(req.body.oldPassword)
  if (!isMatched) {
    return next( new ErrorHandler("Old password is incorrect", 401))
  }
  user.password = req.body.password
  await user.save()
  sendtoken(user, 200,res)
})

//Update user profile  => /api/v1/me/update
exports.updateUserProfile = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email
  }
  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify:false
  })
  res.status(200).json({
    success: true,
    user
  })
})

// Logout user  => /api/v1/logout

exports.logout = catchAsyncError(async (req, res, next) => {
  
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly:true
  })
  res.status(200).json({
    success: true,
    message: "Logged out successfuly "
 })
})



// Admin  controller
// get all users => /api/v1/admin/users
exports.getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find()
  res.status(200).json({
    success: true,
    users
  })
})

// Get User details => /api/v1/admin/user/:id
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id)
  if (!user) {
    return  next( new ErrorHandler(`User does not found with id: ${req.params.id}`))
  }
  res.status(200).json({
    success: true,
    user
  })
})

//Admin update user   => /api/v1/admin/user/:id
exports.adminUpdateUser = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role:req.body.role
  }
  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify:false
  })
  res.status(200).json({
    success: true,
    user
  })
})

// Admin delete  User  => /api/v1/admin/user/:id
exports.adminDeleteUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id)
  if (!user) {
    return  next( new ErrorHandler(`User does not found with id: ${req.params.id}`))
  }
  //remove avatar fron Cloudnidary-- Todo
  await user.remove()
  res.status(200).json({
    success: true,
  })
})