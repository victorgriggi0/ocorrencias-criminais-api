"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "conditions",
      [
        {
          id: "fb30bdf7-a3b9-42d3-aa22-1537c92908d4",
          name: "Registrada",
          description:
            "Indica que a ocorrência foi formalmente registrada na delegacia ou sistema de segurança pública.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "a6e41d87-3ad1-43e4-bf7b-0f67ff1e02d2",
          name: "Em Investigação",
          description:
            "O caso está sendo ativamente investigado pela polícia. Detetives ou oficiais responsáveis estão coletando evidências, entrevistando testemunhas e realizando trabalho de campo.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "f3f097e8-897d-4b3f-8b58-22b2e102844c",
          name: "Em Análise",
          description:
            "As informações e evidências coletadas estão sendo analisadas para formar uma compreensão mais clara do ocorrido. Pode envolver perícia técnica, como análise forense ou revisão de câmeras de segurança.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "7a55b274-850c-4113-bf5e-2c1dd2d87ab7",
          name: "Aguardando Informações Adicionais",
          description:
            "A polícia está aguardando mais informações, seja de testemunhas, vítimas ou de outras agências, para prosseguir com a investigação.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "8c9eabd9-6a89-460b-97a0-a0715e7d4a64",
          name: "Identificado(a) Suspeito(a)",
          description:
            "Um ou mais suspeitos foram identificados, mas ainda não foram capturados ou interrogados.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "9adb3dde-9ea4-4691-afbb-5ed272652db5",
          name: "Suspeito(a) em Custódia",
          description:
            "O suspeito foi detido pela polícia e está em custódia aguardando interrogatório ou ações legais subsequentes.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "b39be16a-caa7-4eed-973c-fbaf6fa8a6b7",
          name: "Em Julgamento",
          description:
            "O caso foi encaminhado ao sistema judiciário, e está em processo de julgamento.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "79b05f45-1789-4b3f-a068-24ac80e1b373",
          name: "Resolvida",
          description:
            "A ocorrência foi resolvida, seja através de um veredito judicial, acordo entre as partes ou outra forma de resolução.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "54a6a1df-50b5-44f8-8362-5aa0eb18cefa",
          name: "Arquivada",
          description:
            "O caso foi encerrado sem resolução devido à falta de evidências, prescrição ou outros motivos legais.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("conditions", null, {});
  },
};
