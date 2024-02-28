"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("occurrences", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      occurrenceType_id: {
        type: Sequelize.UUID,
        references: {
          model: "occurrenceTypes",
          key: "id",
        },
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
      },
      dateOfOccurrence: {
        type: Sequelize.DATE,
      },
      localType_id: {
        type: Sequelize.UUID,
        references: {
          model: "localTypes",
          key: "id",
        },
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
      },
      zip: {
        type: Sequelize.STRING,
      },
      state: {
        type: Sequelize.STRING,
      },
      city: {
        type: Sequelize.STRING,
      },
      neighborhood: {
        type: Sequelize.STRING,
      },
      avenue: {
        type: Sequelize.STRING,
      },
      narrative: {
        type: Sequelize.TEXT,
      },
      condition_id: {
        type: Sequelize.UUID,
        references: {
          model: "conditions",
          key: "id",
        },
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
      },
      team_id: {
        type: Sequelize.UUID,
        references: {
          model: "teams",
          key: "id",
        },
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("occurrences");
  },
};
