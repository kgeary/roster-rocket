const db = require("../models");

module.exports = {
  add: function (req, res) {
    console.log("ENROLL IN COURSE", req.body);
    db.StudentCourse.create(req.body)
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.status(422).json(err);
      });
  },

  drop: function (req, res) {
    console.log("DROP COURSE", req.params.StudentId, req.params.CourseId);
    db.StudentCourse.destroy({ where: { CourseId: req.params.CourseId, StudentId: req.params.StudentId } })
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.status(422).json(err);
      });
  },

  paid: function (req, res) {
    console.log("PAY FOR COURSE", req.params.StudentId, req.params.CourseId);
    db.StudentCourse.update(req.body, { where: { CourseId: req.params.CourseId, StudentId: req.params.StudentId } })
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.status(422).json(err);
      });
  }
};