
module.exports = function (sequelize, DataTypes) {
  var Code = sequelize.define("Code", {
    code: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    }
  });

  return Code;
};
