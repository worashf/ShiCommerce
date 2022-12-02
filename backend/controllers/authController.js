const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncError');
const sendtoken = require("../utils/jwtToken");
const sendEmail = require('../utils/sendMail');
//Signup new user  /api/v1/register
exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: 'sample_id',
      url: 'sample_url',
    }, 
  });
sendtoken(user, 200,res)
});

// Login user /api/v1/login
exports.loginUser = 
catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body
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
