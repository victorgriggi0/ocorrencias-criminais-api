"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class teams extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      teams.belongsToMany(models.users, {
        through: models.users_teams,
        as: "usersInTeam",
        foreignKey: "team_id",
      });
      teams.hasMany(models.occurrences, {
        as: "teamOccurrences",
        foreignKey: "team_id",
      });
    }
  }
  teams.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "teams",
    }
  );
  return teams;
};
