"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "teams",
      [
        {
          id: "ba6d10a8-22b0-44a5-94ca-369957b7bd0d",
          name: "Equipe de Patrulha UFMT",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "d562d56b-f4ab-4d2d-b175-9249b205a7e0",
          name: "Equipe de Patrulha AEROPORTO",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("teams", null, {});
  },
};
