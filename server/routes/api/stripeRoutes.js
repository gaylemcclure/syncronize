const router = require("express").Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


const YOUR_DOMAIN = 'http://localhost:3000';


// router.post('/create-checkout-session', async (req, res) => {
//     console.log(req)
//     const session = await stripe.checkout.sessions.create({
//       ui_mode: 'embedded',
//       line_items: [
//         {
//           // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
//           price: "pr_1234",
//           quantity: 1,
//         },
//       ],
//       mode: 'payment',
//       return_url: `${YOUR_DOMAIN}/return.html?session_id={CHECKOUT_SESSION_ID}`,
//     });
  
//     res.send({clientSecret: session.client_secret});
//   });
  
//   router.get('/session-status', async (req, res) => {
//     const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
  
//     res.send({
//       status: session.status,
//       customer_email: session.customer_details.email
//     });
//   });

  router.get('/config', async (req, res) => {
    const price = await stripe.prices.retrieve(process.env.PRICE);
  
    res.send({
      publicKey: process.env.STRIPE_PUBLISHABLE_KEY,
      unitAmount: price.unit_amount,
      currency: price.currency,
    });
  });

  // Fetch the Checkout Session to display the JSON result on the success page
router.get('/checkout-session', async (req, res) => {
  const { sessionId } = req.query;
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  res.send(session);
});


router.post('/create-checkout-session', async (req, res) => {
  const domainURL = process.env.DOMAIN;

  const { quantity } = 1;

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