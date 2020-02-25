require("dotenv").config();
const express = require("express");
var compression = require("compression");
const mongoose = require("mongoose");
const routes = require("./routes");

const app = express();
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

// Define middleware here
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


// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost/${DBNAME}`, { useNewUrlParser: true, useUnifiedTopology: true });

// Start the API server
app.listen(PORT, function () {
  console.log(`==> API Server now listening on PORT ${PORT}! http://localhost:${PORT}`);
});

