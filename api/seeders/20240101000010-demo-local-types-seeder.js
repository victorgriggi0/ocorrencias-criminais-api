"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "localTypes",
      [
        {
          id: "617f7a5b-8465-4e17-8a85-52228eba8db4",
          name: "Área Residencial",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "fddb601f-bcb9-474b-ad44-e1d5512b7934",
          name: "Estabelecimento Comercial",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "fdbb91e1-6cb3-4b88-b419-3cbed7af6c87",
          name: "Via Pública",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "d135b2fa-2e62-41e6-8707-3aa10313414d",
          name: "Instituição de Ensino",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "ffa1a873-bfd8-45b1-9ea4-9627f17f108c",
          name: "Área Rural",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "f65c74d2-aeb0-4411-aa22-fee3ec6b58a1",
          name: "Espaço Público de Lazer",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "ab433538-46b5-442c-afb4-0964779f928e",
          name: "Estacionamento",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "afb657ec-d136-41bf-ad56-6170fb5e1e7e",
          name: "Transporte Público",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "ec2bc097-ad9e-4b27-8e42-9be6379a5f4f",
          name: "Instituição Financeira",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "216943fd-56b7-4ec1-be82-2dbc82a09e17",
          name: "Área Industrial",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "bcd5bff6-619a-49a5-b216-b7196261e195",
          name: "Parque Industrial",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "9e2fad88-ab6f-43e7-bf19-18e236ee99cc",
          name: "Condomínio Residencial",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "c15f36db-aea5-4e29-99d9-a814e30fcf71",
          name: "Outro Tipo de Local",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("localTypes", null, {});
  },
};
