require('dotenv').config({ path: './.env' });
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const express = require('express');
const app = express();
const path = require("path");
const PORT = process.env.PORT || 5001;
const routes = require('./routes');
const cors = require('cors');
const db = require('./config/connection');

checkEnv();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use(routes);




//Start the server
db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    });
  });

  function checkEnv() {
    const price = process.env.PRICE;
    if (price === "price_12345" || !price) {
      console.log("You must set a Price ID in the environment variables. Please see the README.");
      process.exit(0);
    }
  }
  


