require("dotenv").config();
const express = require("express");
const compression = require("compression");
const session = require("express-session");
const passport = require("./config/passport");
const routes = require("./routes");
const logger = require("morgan");
const db = require("./models");

function shouldCompress(req, res) {
  if (req.headers["x-no-compression"]) {
    // don't compress responses with this request header
    return false;
  }
  // fallback to standard filter function
  return compression.filter(req, res);
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


// Syncing our database and logging a message to the user upon success
var forceSync = false;

db.sequelize.sync({ force: forceSync }).then(function () {
  app.listen(PORT, function () {
    console.log(`Listening on port ${PORT}. Visit http://localhost:${PORT}`);
  });
});


