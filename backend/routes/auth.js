const expess = require('express');
const router = expess.Router();

const { registerUser,loginUser, logout,forgotPassword } = require('../controllers/authController');

router.route('/signup').post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout)
router.route("/password/forgot").post(forgotPassword)
module.exports = router;
