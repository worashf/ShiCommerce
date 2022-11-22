const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncError');

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
  const token = user.JsonWebToken();
  res.status(201).json({
    success: true,
    user,
    token,
  });
});
