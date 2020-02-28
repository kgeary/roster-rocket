const db = require("../models");

module.exports = {
  readAll: function (req, res) {
    db.Course.findAll({})
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.status(422).json(err);
      });
  },
};