"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class occurrences extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      occurrences.belongsTo(models.occurrenceTypes, {
        as: "typeOfOccurrence",
        foreignKey: "occurrenceType_id",
      });
      occurrences.belongsTo(models.localTypes, {
        as: "localTypeOfOccurrence",
        foreignKey: "occurrenceType_id",
      });
      occurrences.belongsTo(models.conditions, {
        as: "conditionOfOccurrence",
        foreignKey: "condition_id",
      });
      occurrences.belongsTo(models.teams, {
        as: "teamOfOccurrence",
        foreignKey: "team_id",
      });
    }
  }
  occurrences.init(
    {
      occurrenceType_id: DataTypes.UUID,
      dateOfOccurrence: DataTypes.DATE,
      localType_id: DataTypes.UUID,
      zip: DataTypes.STRING,
      state: DataTypes.STRING,
      city: DataTypes.STRING,
      neighborhood: DataTypes.STRING,
      avenue: DataTypes.STRING,
      narrative: DataTypes.TEXT,
      condition_id: DataTypes.UUID,
      team_id: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "occurrences",
    }
  );
  return occurrences;
};
