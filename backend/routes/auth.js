const expess = require('express');
const router = expess.Router();

const { registerUser,loginUser, logout,forgotPassword,resetPassword } = require('../controllers/authController');

router.route('/signup').post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout)
router.route("/password/forgot").post(forgotPassword)
router.route("password/reset/:token").put(resetPassword)
module.exports = router;
