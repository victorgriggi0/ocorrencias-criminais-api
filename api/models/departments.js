"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class departments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      departments.hasMany(models.users, {
        as: "usersInDepartment",
        foreignKey: "department_id",
      });
    }
  }
  departments.init(
    {
      name: DataTypes.STRING,
      zip: DataTypes.STRING,
      state: DataTypes.STRING,
      city: DataTypes.STRING,
      neighborhood: DataTypes.STRING,
      avenue: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "departments",
    }
  );
  return departments;
};
