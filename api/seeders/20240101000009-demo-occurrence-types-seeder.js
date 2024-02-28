"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "occurrenceTypes",
      [
        {
          id: "743617d2-cf71-4501-a2bd-a1e6fea03753",
          name: "Extravio",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "2550ad72-2a33-49e3-93b2-28301582d4fd",
          name: "Furto de Celular",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "ceb4e212-47e3-4404-afbf-ce29fb966c3f",
          name: "Denúncia",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "4ad149f0-1909-4cf4-997d-81be7a29b170",
          name: "Exercício Ilegal da Profissão",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "e1f51240-d47c-4704-af29-469736f13c45",
          name: "Desaparecimento de Pessoas",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "b0df586b-8282-40b1-822e-d6affb79fae2",
          name: "Calúnia",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "dd1ef2e0-7487-4e27-9cea-e34f86abde25",
          name: "Difamação",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "bbc34732-0b99-4fe2-8a8d-290cd4910da3",
          name: "Ameaça",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "c0f2e2e3-9ada-45f4-ae16-216dfec64b32",
          name: "Constrangimento Ilegal",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "39473b48-e5b2-49f4-8f6d-be098cf376dd",
          name: "Violação de Domicílio",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "c17cef4b-8b9c-44c4-9a89-2c6959b81c9e",
          name: "Furto",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "8a464091-c2ba-45cf-b8ca-3b0e97ff5ee1",
          name: "Outras Ocorrências",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("occurrenceTypes", null, {});
  },
};
