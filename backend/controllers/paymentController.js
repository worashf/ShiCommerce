const catchAsyncError = require("../middlewares/catchAsyncError");

const stripe = require('stripe')('sk_test_51JRYb7CzV4X0P6DEeag04F4Q62Ak08hvGQLUEF7Q5LMngzCg4MHpzctzsWRs21mhGmPdQyyocHpOmlHlIqqaJyjo00dKqECPep');


// process stripe payment => /api/v1/process/payment

exports.processPayment = catchAsyncError(async (req, res, next) => {
  
let value = parseInt(req.body.amount)
   
    const paymentIntent = await stripe.paymentIntents.create({
        amount: value,
        currency: 'usd',

        metadata: { integration_check: 'accept_a_payment' }
    });

    res.status(200).json({
        success: true,
        client_secret: paymentIntent.client_secret
    })
});

// send stripe API key => /api/v1/stripeapi
exports.sendStripeApi = catchAsyncError(async (req, res, next) => {
  res.status(200).json({
    stripeApiKey: process.env.STRIPE_API_KEY,
  });
});
