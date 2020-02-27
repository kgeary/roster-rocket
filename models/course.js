
module.exports = function (sequelize, DataTypes) {
  var Course = sequelize.define("Course", {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true
    },
    cost: {
      type: DataTypes.INTEGER
    },
    capacity: {
      type: DataTypes.INTEGER
    }
  });

  Course.associate = (models) => {
    models.Course.belongsToMany(models.Student, { through: "StudentCourses" });
    models.Course.hasOne(models.User);
  };

  return Course;
};
