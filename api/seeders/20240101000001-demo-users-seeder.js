"use strict";
const { hash } = require("bcryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          id: "b2a099d3-b8c9-49d3-a56e-fa9b676130a0",
          name: "postgres",
          email: "postgres@occ.br",
          password: await hash("outerwilds", 10),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
