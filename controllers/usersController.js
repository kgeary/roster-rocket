const db = require("../models");

// Return a user with sensitive fields (password) removed
function stripPassword(user) {
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
      phone: "555-1212",
      name: "Default User Name",
      img: null
    })
      .then(dbModel => {
        console.log(dbModel);
        req.login(dbModel, function (err) {
          if (!err) {
            res.json(stripPassword(dbModel));
          } else {
            //handle error
            console.log("SIGNUP LOGIN ERR", err);
            res.status(422).json(err);
          }
        });

      })
      .catch(err => {
        console.log("ERROR ADDING USER");
        console.log(err);
        res.status(422).json(err);
      });
  },

  login: function (req, res) {
    res.json(stripPassword(req.user));
  },

  logout: function (req, res) {
    if (!req.user) {
      res.json({ message: "No users logged in out" });
    }
    console.log("Logging Out User");
    if (req.user) {
      const username = req.user.name || req.user.email;
      req.logout();
      res.json({ message: `${username} logged out` });
    } else {
      res.json({ message: "no user logged in" });
    }
  },

  read: function (req, res) {
    if (req.user) {
      res.json(stripPassword(req.user));
    } else {
      res.json();
    }
  },

  changePassword: async function (req, res) {
    if (req.user) {
      // Find the user in the database
      try {
        console.log("Finding User");
        const dbUser = await db.User.findOne({ where: { id: req.user.id } });
        // if the old password Matches - Update the new Password
        console.log("User Found...Checking Password");
        if (dbUser.validPassword(req.body.oldPassword)) {
          console.log("Password Matched...Saving New Password");
          dbUser.password = req.body.newPassword;
          dbUser.save({ individualHooks: true });
          res.json({ success: true });
        } else {
          console.log("Password did not match");
          res.json({ success: false });
        }
      } catch (err) {
        console.log("Error Changing Password", err);
        res.json({ success: false });
      }
    } else {
      console.log("NO USER DETECTED - UNAUTHORIZED PW CHANGE");
      res.status(401).json({ message: "Unauthorized" });
    }
  },

};