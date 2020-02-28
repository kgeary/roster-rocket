const db = require("../models");

module.exports = {
  readAll: function (req, res) {
    db.Student.findAll({}).then(data => {
      res.json(data);
    });

  },
}