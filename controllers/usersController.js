const db = require("../models");

// Defining methods for the usersController
module.exports = {
  logout: function (req, res) {
    console.log("Logging out user");
    if (req.user) {
      const username = req.user.name || req.user.email;
      req.logout();
      res.json({ message: `${username} logged out` });
    } else {
      res.json({ message: "no user logged in" });
    }
  },

  getCurrentUserWithChildren: function (req, res) {
    if (req.user) {
      db.User.findOne({
        where: { id: req.user.id },
        include: {
          model: db.Student,
          include: [
            {
              model: db.User
            },
            {
              model: db.StudentCourse,
              include: {
                model: db.Course,
                include: {
                  model: db.User,
                }
              }
            }]
        }
      })
        .then(data => {
          res.json(data);
        })
        .catch(err => {
          console.log("GetUserWithKids", err);
          res.status(422).json("Error retrieving User");
        });
    } else {
      res.status(401).json({ message: "Not Authorized" });
    }
  },

  getUserByIdWithChildren: function (req, res) {
    if (req.user) {
      db.User.findOne({
        where: { id: req.params.id },
        include: {
          model: db.Student,
          include: [
            {
              model: db.User
            },
            {
              model: db.StudentCourse,
              include: {
                model: db.Course,
                include: {
                  model: db.User,
                }
              }
            }]
        }
      })
        .then(data => {
          res.json(data);
        })
        .catch(err => {
          console.log("GetUserByIdWithKids", err);
          res.status(422).json("Error retrieving User");
        });
    } else {
      res.status(401).json({ message: "Not Authorized" });
    }
  },

  readAll: function (req, res) {
    db.User.findAll({
      where: { isAdmin: false },
      include: {
        model: db.Student,
        include: [
          {
            model: db.User
          },
          {
            model: db.StudentCourse,
            include: {
              model: db.Course,
              include: {
                model: db.User,
              }
            }
          }
        ]
      }
    })
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        console.log("readAll ERROR", err);
        res.status(422).json(err);
      });
  },

  readById: function (req, res) {
    db.User.findAll({ where: { id: req.params.id }, include: { model: Student } })
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.status(422).json(err);
      });
  },

  removeById: function (req, res) {
    db.User.destroy({ where: { id: req.params.id } })
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.status(422).json(err);
      });
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

  updateImage: function (req, res) {
    console.log("UPDATE IMAGE USER", req.body);
    db.User.update({ img: req.body.img }, { where: { id: req.params.id } })
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        console.log("UPDATE IMAGE ERROR", err);
        res.status(422).json(err);
      });
  },

  updateUser: function (req, res) {
    db.User.update(req.body, { where: { id: req.params.id } })
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.status(422).json(err);
      });
  }

};