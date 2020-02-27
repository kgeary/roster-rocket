const db = require("../models");

// Return a user with sensitive fields (password) removed
function getUserStrip(user) {
  if (!user.email) {
    return undefined;
  }

  const newUser = {
    id: user.id,
    email: user.email,
    username: user.name,
  };
  return newUser;
}

// Defining methods for the usersController
module.exports = {
  create: function (req, res) {
    db.User.create({
      email: req.body.email.toLowerCase(),
      password: req.body.password,
      // TODO - Update default value fields
      name: "",
      img: ""
    })
      .then(dbModel => {
        console.log(dbModel);
        res.json(getUserStrip(dbModel));
      })
      .catch(err => {
        console.log("ERROR ADDING USER");
        console.log(err);
        if (err.code === 11000) {
          res.status(409).json(err);
        } else {
          res.status(422).json(err);
        }
      });
  },

  login: function (req, res) {
    res.json(getUserStrip(req.user));
  },

  logout: function (req, res) {
    if (!req.user) {
      res.json({ message: "No users logged in out" });
    }
    console.log("Logging Out User");
    const username = req.user.name || req.user.email;
    req.logout();
    res.json({ message: `${username} logged out` });
  },

  read: function (req, res) {
    if (req.user) {
      res.json(getUserStrip(req.user));
    } else {
      res.json();
    }
  },
};