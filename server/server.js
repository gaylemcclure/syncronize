require("dotenv").config();
const express = require('express');
const app = express();
const path = require("path");
const PORT = process.env.PORT || 5001;
const routes = require('./routes');
const cors = require('cors');


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use(routes);

//Start the server
app.listen(PORT, () => console.log(`server started on port ${PORT}`));
