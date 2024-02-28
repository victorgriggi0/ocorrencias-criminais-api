"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "permissions",
      [
        {
          id: "d2813f76-3f03-467b-8a06-f9c38d240009",
          name: "Visualizar Departamento",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "8afe78fe-24c0-4dab-8eaf-6e9286aacd1f",
          name: "Criar Departamento",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "2d110185-852f-42aa-9c0f-48782b4cd424",
          name: "Apagar Departamento",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "c153dfe8-3daa-4ee9-8e90-9c9f7eb9dc6d",
          name: "Editar Departamento",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "ff3a810f-7efb-4b84-b0af-d8a69f6f8a09",
          name: "Visualizar Usuário",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "df097b15-9695-4c7e-be3d-a08fd95f0779",
          name: "Criar Usuário",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "e198f939-727f-42a2-855a-ae6794b7e3c6",
          name: "Apagar Usuário",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "4f446e85-7e24-41de-9bac-23991969dd05",
          name: "Editar Usuário",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "659516d8-cb93-4c28-8c24-fc08c250a7f9",
          name: "Visualizar Cargo",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "3d8f6272-bde8-4709-abef-61d02513b0d2",
          name: "Criar Cargo",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "a84aa749-7b80-40c1-9f38-54e9d74e0863",
          name: "Apagar Cargo",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "9fe8e0f9-b3a0-4bc0-b2bc-170084418781",
          name: "Editar Cargo",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "a29d8f2f-2efb-41f4-8f1f-c3baf333d961",
          name: "Visualizar Permissão",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "5ba6d0e9-c568-4633-ba56-e053ac313b87",
          name: "Criar Permissão",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "a48ae611-41ed-492f-9b1d-0c128e07c31d",
          name: "Apagar Permissão",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "d81a05f3-50cf-402b-86c4-87d2c45c2993",
          name: "Editar Permissão",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "12b66bdb-2c03-46da-9868-e83d1e41d6fa",
          name: "Visualizar Equipe",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "a945732f-280d-4802-9de7-0fab1453bdb6",
          name: "Criar Equipe",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "03404c86-cd93-4cf8-9505-ad6019fd17b5",
          name: "Apagar Equipe",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "c5bd6d15-6868-4322-a8de-48604bbd625c",
          name: "Editar Equipe",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "c606d9b4-d278-4b5f-bdd6-75efa68f3181",
          name: "Visualizar Tipo de Ocorrência",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "8202ca37-73f3-4d71-88d0-b2b92bace7f2",
          name: "Criar Tipo de Ocorrência",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "bf343d5b-5ff2-46df-9852-aff2ca950344",
          name: "Apagar Tipo de Ocorrência",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "c7dcdaa5-17ee-4e1b-a479-c1afa06a829b",
          name: "Editar Tipo de Ocorrência",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "c31dd4eb-fc28-4b0b-861d-4bd2d88cbf5f",
          name: "Visualizar Tipo de Local",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "78647e16-1f52-4d89-bc82-dff7eaeb48da",
          name: "Criar Tipo de Local",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "c436c1ff-6200-4a93-8923-3b5d6f6b2fdb",
          name: "Apagar Tipo de Local",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "bea735e0-1112-4bd3-8448-b32a418be7b4",
          name: "Editar Tipo de Local",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "400e6371-1f0d-41b1-b242-65c5ae19c6e7",
          name: "Visualizar Condição",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "7163bc81-0686-4b8f-83e6-d4b9fee64d03",
          name: "Criar Condição",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "f9acb163-a6d9-4285-bd0f-9e4f398dfd27",
          name: "Apagar Condição",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "91cc0618-4d29-4151-a6db-41c0fe7365ca",
          name: "Editar Condição",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "c4f40934-3126-4a7a-890d-cf606ee1767e",
          name: "Visualizar Ocorrência",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "b9cf418b-1180-4ef6-8605-a5cb20231dda",
          name: "Criar Ocorrência",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "146ac52b-f964-48f6-ae07-b5ff88d8ad2e",
          name: "Apagar Ocorrência",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "ec3a636c-b1a7-4fa8-8597-54875c64f704",
          name: "Editar Ocorrência",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("permissions", null, {});
  },
};
