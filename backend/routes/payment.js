const express = require('express');
const router = express.Router();
const {processPayment,sendStripeApi}  = require("../controllers/paymentController")

const { isAuthenticatedUser} = require("../middlewares/auth")

router.route("process/payment").post(isAuthenticatedUser, processPayment)

router.route("stripe-api-key").get( isAuthenticatedUser, sendStripeApi)


module.exports = router