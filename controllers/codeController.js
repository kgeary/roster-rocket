const db = require("../models");

module.exports = {
  addCode: (req, res) => {
    db.Code.create({
      code: req.body.code
    })
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.status(422).json(err);
      });
  },

  addCode: (req, res) => {
    db.Code.findAll({})
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.status(422).json(err);
      });
  },

  removeCode: (req, res) => {
    db.Code.destroy({
      where: {
        code: req.params.code
      }
    })
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.status(422).json(err);
      });
  },
};