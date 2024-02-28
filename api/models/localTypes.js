"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class localTypes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      localTypes.hasMany(models.occurrences, {
        as: "occurrencesInTypeOfLocation",
        foreignKey: "localType_id",
      });
    }
  }
  localTypes.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "localTypes",
    }
  );
  return localTypes;
};
