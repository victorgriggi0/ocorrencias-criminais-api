"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users_roles",
      [
        {
          user_id: "b2a099d3-b8c9-49d3-a56e-fa9b676130a0",
          role_id: "660fea26-94f9-474c-a472-dd8b0015a320",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users_roles", null, {});
  },
};
