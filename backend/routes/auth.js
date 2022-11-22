const expess = require('express');
const router = expess.Router();

const { registerUser } = require('../controllers/authController');

router.route('signup').post(registerUser);

module.exports = router;
