"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "departments",
      [
        {
          id: "4d059772-2250-43ac-8b42-7a42df0e643b",
          name: "Delegacia Regional de Cuiabá",
          state: "MT",
          city: "Cuiabá",
          neighborhood: "Bandeirantes",
          avenue: "Rua Diogo Domingos Ferreira",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "1bd6be6a-3f0a-4bcf-96f2-0a1ac03e3113",
          name: "1ª Delegacia de Polícia de Cuiabá  (Central de Ocorrências)",
          state: "MT",
          city: "Cuiabá",
          neighborhood: "Centro",
          avenue: "Av. Tenente Coronel Duarte (Prainha)",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "db80e01a-c6a2-484f-ba4d-29eb0749530e",
          name: "Posto de atendimento Shopping Goiabeiras - Cuiabá",
          state: "MT",
          city: "Cuiabá",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "b0b4df42-fb06-4d8a-8a53-7773ebbdc17b",
          name: "Central de Flagrantes de Cuiabá (Plantão)",
          state: "MT",
          city: "Cuiabá",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "f7c2f19f-04a8-47cc-b2eb-4ad5d7295639",
          name: "Plantão 24h de Atendimento a Vítimas de Violência Doméstica e Sexual",
          state: "MT",
          city: "Cuiabá",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "38f3c343-46c4-4dac-9b5b-d3c4d647f8a1",
          name: "Delegacia Especializada de Delitos Contra a Pessoa Idosa - DEDCPI",
          state: "MT",
          city: "Cuiabá",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "44f4de59-14be-428c-b665-215b35ab54e9",
          name: "Delegacia Especializada de Defesa da Mulher de Cuiabá - DEDM",
          state: "MT",
          city: "Cuiabá",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "2a089722-041e-4782-b552-e07b13e15878",
          name: "Delegacia Especializada de Delitos de Trânsito",
          state: "MT",
          city: "Cuiabá",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "78fa7249-12be-4e32-a735-849dd110db1c",
          name: "Delegacia Especializada de Defesa do Consumidor – DECON",
          state: "MT",
          city: "Cuiabá",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "e67e9593-1fd8-4a9e-ba36-edaa951acb91",
          name: "Delegacia Especializada de Roubos e Furtos - DERF",
          state: "MT",
          city: "Cuiabá",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "ac8b2690-1a55-4d9d-b3d3-f71c815d4445",
          name: "Delegacia Especializada de Roubos e Furtos de Veículos Automotores – DERFVA",
          state: "MT",
          city: "Cuiabá",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "030f985c-1e8b-4bcf-9e87-9dca8b5e73c3",
          name: "Delegacia Especializada de Homicídios e Proteção a Pessoa – DHPP",
          state: "MT",
          city: "Cuiabá",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "e51d20ab-3fe3-4b6e-8693-7e10901c5c67",
          name: "Delegacia Especializada do Adolescente – DEA",
          state: "MT",
          city: "Cuiabá",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "49a44248-d6fa-4db4-9d31-1a609210a3ab",
          name: "Delegacia Especializada de Defesa dos Direitos da Criança e do Adolescente – DEDDICA",
          state: "MT",
          city: "Cuiabá",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "976b256f-5367-4e1b-af17-09c613182e8c",
          name: "Delegacia Especializada de Estelionato e Outras Fraudes de Cuiabá",
          state: "MT",
          city: "Cuiabá",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("departments", null, {});
  },
};
