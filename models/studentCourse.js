module.exports = function (sequelize, DataTypes) {
  var StudentCourse = sequelize.define("StudentCourse", {
    Paid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  StudentCourse.associate = (models) => {
    models.StudentCourse.belongsTo(models.Student);
    models.StudentCourse.belongsTo(models.Course);
  };

  return StudentCourse;
};
