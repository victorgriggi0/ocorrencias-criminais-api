"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      users.belongsToMany(models.roles, {
        through: models.users_roles,
        as: "rolesOfUser",
        foreignKey: "user_id",
      });
      users.belongsToMany(models.permissions, {
        through: models.users_permissions,
        as: "permissionsOfUser",
        foreignKey: "user_id",
      });
      users.belongsTo(models.departments, {
        as: "departmentOfUser",
        foreignKey: "department_id",
      });
      users.belongsToMany(models.teams, {
        through: models.users_teams,
        as: "teamsOfUser",
        foreignKey: "user_id",
      });
    }
  }
  users.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "users",
    }
  );
  return users;
};
