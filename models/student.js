module.exports = function (sequelize, DataTypes) {
  var Student = sequelize.define("Student", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    img: {
      type: DataTypes.STRING,
      defaultValue: "https://via.placeholder.com/150"
    }

  });

  Student.associate = (models) => {
    models.Student.belongsToMany(models.Course, { through: models.StudentCourse });
    models.Student.hasMany(models.StudentCourse);
    models.Student.belongsTo(models.User, { foreignKey: "ParentId" });
  };

  return Student;
};
