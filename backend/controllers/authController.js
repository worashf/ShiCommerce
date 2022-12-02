const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncError');
const sendtoken = require("../utils/jwtToken")
//Signup new user  /api/v1/register
exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: '',
      url: '',
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
