require("dotenv").config();
const express = require('express');
const app = express();
const path = require("path");
const PORT = process.env.PORT || 5001;
const routes = require('./routes');
const cors = require('cors');
const db = require('./config/connection');

console.log(db)

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
  


