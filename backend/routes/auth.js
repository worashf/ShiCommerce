const expess = require('express');
const router = expess.Router();

const { registerUser, loginUser, logout, forgotPassword,
    resetPassword, getUserProfile } = require('../controllers/authController');
const {isAuthenticatedUser} = require("../middlewares/auth")
router.route('/signup').post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout)
router.route("/password/forgot").post(forgotPassword)
router.route("password/reset/:token").put(resetPassword)
router.route("/me").get(isAuthenticatedUser, getUserProfile)
module.exports = router;
