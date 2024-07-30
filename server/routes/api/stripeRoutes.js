const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const YOUR_DOMAIN = "http://localhost:3000";

router.get("/config", async (req, res) => {
  let prodEnv = null;
  switch (req.query.plan) {
    case "basic":
      prodEnv = process.env.BASIC_PROD;
      break;
    case "standard":
      prodEnv = process.env.STANDARD_PROD;
      break;

    case "pro":
      prodEnv = process.env.PRO_PROD;
      break;

    case "lifetime":
      prodEnv = process.env.LIFETIME_PROD;
      break;
    default:
      break;
  }
  const prod = await stripe.products.retrieve(prodEnv);
  const price = await stripe.prices.retrieve(prod.default_price);

  res.send({
    publicKey: process.env.STRIPE_PUBLISHABLE_KEY,
    unitAmount: price.unit_amount,
    currency: price.currency,
    description: prod.description,
    name: prod.name,
    interval: price.recurring.interval,
  });
});

// Fetch the Checkout Session to display the JSON result on the success page
router.get("/checkout-session", async (req, res) => {
  const { sessionId } = req.query;
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  res.send(session);
});

router.post("/create-checkout-session-recurring", async (req, res) => {
  let planType = "";
  const paramString = req.url;
  const searchParams = new URLSearchParams(paramString);
  searchParams.forEach((value) => {
    planType = value;
  });

  let priceEnv = null;
  switch (planType) {
    case "basic":
      priceEnv = process.env.BASIC_PRICE;
      break;
    case "standard":
      priceEnv = process.env.STANDARD_PRICE;
      break;
    case "pro":
      priceEnv = process.env.PRO_PRICE;
      break;

    case "lifetime":
      priceEnv = process.env.LIFETIME_PRICE;
      break;
    default:
      break;
  }

  const domainURL = process.env.VITE_DOMAIN;


  // Create new Checkout Session for the order
  // Other optional params include:
  // [billing_address_collection] - to display billing address details on the page
  // [customer] - if you have an existing Stripe Customer ID
  // [customer_email] - lets you prefill the email input in the Checkout page
  // [automatic_tax] - to automatically calculate sales tax, VAT and GST in the checkout page
  // For full details see https://stripe.com/docs/api/checkout/sessions/create
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [
      {
        price: priceEnv,
        quantity: 1,
      },
    ],
    // ?session_id={CHECKOUT_SESSION_ID} means the redirect will have the session ID set as a query param
    success_url: `${domainURL}/${process.env.VITE_PORT}/success=?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${domainURL}/${process.env.VITE_PORT}/canceled`,
    // automatic_tax: {enabled: true},
  });

  return res.redirect(303, session.url);
});

// router.post('/create-checkout-session', async (req, res) => {
//   const domainURL = process.env.DOMAIN;

//   const { quantity } = 1;

//   // Create new Checkout Session for the order
//   // Other optional params include:
//   // [billing_address_collection] - to display billing address details on the page
//   // [customer] - if you have an existing Stripe Customer ID
//   // [customer_email] - lets you prefill the email input in the Checkout page
//   // [automatic_tax] - to automatically calculate sales tax, VAT and GST in the checkout page
//   // For full details see https://stripe.com/docs/api/checkout/sessions/create
//   const session = await stripe.checkout.sessions.create({
//     mode: 'payment',
//     line_items: [
//       {
//         price: process.env.PRICE,
//         quantity: quantity
//       },
//     ],
//     // ?session_id={CHECKOUT_SESSION_ID} means the redirect will have the session ID set as a query param
//     success_url: `${domainURL}/success=?session_id={CHECKOUT_SESSION_ID}`,
//     cancel_url: `${domainURL}/canceled`,
//     // automatic_tax: {enabled: true},
//   });

//   return res.redirect(303, session.url);
// });

module.exports = router;
