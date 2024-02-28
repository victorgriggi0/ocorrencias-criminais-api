"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class occurrenceTypes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      occurrenceTypes.hasMany(models.occurrences, {
        as: "occurrencesOfType",
        foreignKey: "occurrenceType_id",
      });
    }
  }
  occurrenceTypes.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "occurrenceTypes",
    }
  );
  return occurrenceTypes;
};
