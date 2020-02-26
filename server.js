require("dotenv").config();
const express = require("express");
var compression = require("compression");
const mongoose = require("mongoose");
var session = require("express-session");
var passport = require("./config/passport");
const routes = require("./routes");
var logger = require('morgan');
const DBNAME = "project3";
const PORT = process.env.PORT || 3001;

function shouldCompress(req, res) {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false
  }
  // fallback to standard filter function
  return compression.filter(req, res)
}

const app = express();

// Define middleware here
app.use(logger("dev"));
app.use(compression({ filter: shouldCompress }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  console.log("PRODUCTION BUILD!");
  app.use(express.static("client/build"));
} else {
  console.log("DEV BUILD");
}

// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "mr. little jeans", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost/${DBNAME}`, { useNewUrlParser: true, useUnifiedTopology: true });

// Start the API server
app.listen(PORT, function () {
  console.log(`==> API Server now listening on PORT ${PORT}! http://localhost:${PORT}`);
});

