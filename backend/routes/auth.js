const expess = require('express');
const router = expess.Router();

const { registerUser,loginUser, logout } = require('../controllers/authController');

router.route('signup').post(registerUser);
router.route("login").post(loginUser);
router.route("logout").get(logout)
module.exports = router;
