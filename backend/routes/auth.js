const expess = require('express');
const router = expess.Router();

const { registerUser, loginUser, logout, forgotPassword,
    resetPassword, getUserProfile, updatePassword,
    updateUserProfile, getAllUsers } = require('../controllers/authController');
const {isAuthenticatedUser} = require("../middlewares/auth")
router.route('/signup').post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout)
router.route("/password/forgot").post(forgotPassword)
router.route("password/reset/:token").put(resetPassword)
router.route("/me").get(isAuthenticatedUser, getUserProfile)
router.route("/password/update").put(isAuthenticatedUser, updatePassword)
router.route("me/update").put(isAuthenticatedUser, updateUserProfile)
//Admin routes
router.route("/admin/users").get(isAuthenticatedUser,getAllUsers)
module.exports = router;
