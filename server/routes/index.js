const router = require("express").Router();
const welcomePage = require("./welcomePageRoutes");
const apiRoutes = require("./api");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


router.use("/", welcomePage);
router.use("/api", apiRoutes);

router.post('/create-checkout-session', async (req, res) => {
    debugger;
    const domainURL = process.env.DOMAIN;
  
    const { quantity } = req.body;
  
    // Create new Checkout Session for the order
    // Other optional params include:
    // [billing_address_collection] - to display billing address details on the page
    // [customer] - if you have an existing Stripe Customer ID
    // [customer_email] - lets you prefill the email input in the Checkout page
    // [automatic_tax] - to automatically calculate sales tax, VAT and GST in the checkout page
    // For full details see https://stripe.com/docs/api/checkout/sessions/create
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price: process.env.PRICE,
          quantity: quantity
        },
      ],
      // ?session_id={CHECKOUT_SESSION_ID} means the redirect will have the session ID set as a query param
      success_url: `${domainURL}/success=?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${domainURL}/canceled`,
      // automatic_tax: {enabled: true},
    });
  
    return res.redirect(303, session.url);
  });



module.exports = router;
