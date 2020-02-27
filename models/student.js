module.exports = function (sequelize, DataTypes) {
  var Student = sequelize.define("Student", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    img: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "https://via.placeholder.com/150"
    }

  });

  Student.associate = (models) => {
    models.Student.belongsToMany(models.Course, { through: "StudentCourses" });
    models.Student.belongsTo(models.User, { foreignKey: "parentId" });
  };

  return Student;
};
