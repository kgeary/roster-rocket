const db = require("../models");

module.exports = {
  addCourse: function (req, res) {
    db.Course.create(req.body)
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.status(422).json(err);
      });
  },

  readAll: function (req, res) {
    db.Course.findAll({})
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.status(422).json(err);
      });
  },

  readById: function (req, res) {
    db.Course.findAll({ where: { id: req.params.id } })
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.status(422).json(err);
      });
  },

  updateCourse: function (req, res) {
    db.Course.updateOne({ id: req.params.id }, req.body)
  },

  removeCourse: function (req, res) {
    db.Course.destroy({ where: { id: req.params.id } })
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.status(422).json(err);
      });
  },
};