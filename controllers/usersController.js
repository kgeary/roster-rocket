const db = require("../models");
const sgMail = require("@sendgrid/mail");

// Generate a random password
function generateRandomPw() {
  const pwChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!$#";
  const length = Math.floor(Math.random() * 5) + 6;
  let pw = [];
  for (let i = 0; i < length; i++) {
    pw.push(pwChars[Math.floor(Math.random() * pwChars.length)]);
  }
  return pw.join("");
}

// Send an email
function sendEmail(to, from, subject, body) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: to,
    from: from,
    subject: subject,
    html: body,
  };
  (async () => {
    try {
      await sgMail.send(msg);
    } catch (err) {
      console.error(err.toString());
    }
  })();

}

// Remove Sensitive Info from User object
function getUserStripped(user) {
  if (!user.username) {
    return undefined;
  }

  const newUser = {
    _id: user._id,
    username: user.username,
    email: user.email,
  };
  return newUser;
}

// Defining methods for the usersController
module.exports = {
  create: function (req, res) {
    db.User.create(req.body)
      .then(dbModel => {
        console.log(dbModel);
        res.json(getUserStripped(dbModel));
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
    res.json(getUserStripped(req.user));
  },

  logout: function (req, res) {
    if (!req.user) {
      res.json({ message: "No users logged in out" });
    }
    console.log("Logging Out User");
    const username = req.user.username;
    req.logout();
    res.json({ message: `${username} logged out` });
  },

  read: function (req, res) {
    if (req.user) {
      res.json(getUserStripped(req.user));
    } else {
      res.json();
    }
  },

  resetPassword: function (req, res) {
    if (req.body && req.body.email) {
      const tempPassword = generateRandomPw();
      db.User.findOne({ email: req.body.email.toLowerCase() })
        .then(dbUser => {
          dbUser.password = tempPassword;
          return dbUser.save();
        })
        .then(() => {
          const body = `Your temporary password is: ${tempPassword}`;
          sendEmail(req.body.email, "rosterrocket2020@gmail.com", "Your new password", body);
          res.json();
        })
        .catch(err => {
          res.status(422).json(err);
        });
    } else {
      res.status(422).json("Email not provided");
    }
  },
};