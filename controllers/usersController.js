const db = require("../models");

// Defining methods for the usersController
module.exports = {
  read: function (req, res) {
    if (req.user) {
      res.json(getUser(req.user));
    } else {
      res.json();
    }
  },
}