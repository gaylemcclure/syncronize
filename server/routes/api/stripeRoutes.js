const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

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

//POST route for a recurring payment
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

  // Create new Checkout Session for the order
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [
      {
        price: priceEnv,
        quantity: 1,
      },
    ],
    success_url: `${process.env.DOMAIN}/success=?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.DOMAIN}/canceled`,
  });

  return res.redirect(303, session.url);
});


module.exports = router;
