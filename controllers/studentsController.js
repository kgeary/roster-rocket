const db = require("../models");

module.exports = {
  addStudent: function (req, res) {
    db.Student.create(req.body)
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.status(422).json(err);
      });
  },

  readAll: function (req, res) {
    db.Student.findAll({
      include: [
        {
          model: db.User, // Parent
        },
        {
          model: db.StudentCourse, // Students Courses
          include: {
            model: db.Course, // Course Info for those courses
            as: "Course",
            include: {
              model: db.User, // Teacher
            }
          }
        }
      ]
    }).then(data => {
      res.json(data);
    });
  },

  readById: function (req, res) {
    db.Student.findAll({ where: { id: req.params.id } })
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.status(422).json(err);
      });
  },

  removeById: function (req, res) {
    db.Student.destroy({ where: { id: req.params.id } })
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.status(422).json(err);
      });
  },
};