const { v4: uuidv4 } = require("uuid");

const database = require("../models");

class OccurrenceController {
  async getAll(_, res) {
    try {
      const occurrences = await database.occurrences.findAll({
        /* order */
        include: [
          {
            model: database.occurrenceTypes,
            as: "typeOfOccurrence",
            attributes: ["id", "name"],
          },
          {
            model: database.localTypes,
            as: "localTypeOfOccurrence",
            attributes: ["id", "name"],
          },
          {
            model: database.conditions,
            as: "conditionOfOccurrence",
            attributes: ["id", "name"],
          },
          {
            model: database.teams,
            as: "teamOfOccurrence",
            attributes: ["id", "name"],
          },
        ],
      });

      res.status(200).json({ occurrences });
    } catch (error) {
      console.error("error:", error);
      res.status(400).send({ message: error.message });
    }
  }

  async get(req, res) {
    try {
      let { currentPage = 1, pageSize = 10 } = req.query;

      currentPage = Math.max(parseInt(currentPage, 10), 1);
      pageSize = Math.max(parseInt(pageSize, 10), 1);

      const offset = (currentPage - 1) * pageSize;

      const { count, rows: occurrences } =
        await database.occurrences.findAndCountAll({
          /* order */
          include: [
            {
              model: database.occurrenceTypes,
              as: "typeOfOccurrence",
              attributes: ["id", "name"],
            },
            {
              model: database.localTypes,
              as: "localTypeOfOccurrence",
              attributes: ["id", "name"],
            },
            {
              model: database.conditions,
              as: "conditionOfOccurrence",
              attributes: ["id", "name"],
            },
            {
              model: database.teams,
              as: "teamOfOccurrence",
              attributes: ["id", "name"],
            },
          ],
          offset,
          limit: pageSize,
        });

      const totalPages = Math.ceil(count / pageSize);

      res.status(200).json({
        occurrences,
        totalPages,
        currentPage,
      });
    } catch (error) {
      console.error("error:", error);
      res.status(400).send({ message: error.message });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;

      const occurrence = await database.occurrences.findOne({
        include: [
          {
            model: database.occurrenceTypes,
            as: "typeOfOccurrence",
            attributes: ["id", "name"],
          },
          {
            model: database.localTypes,
            as: "localTypeOfOccurrence",
            attributes: ["id", "name"],
          },
          {
            model: database.conditions,
            as: "conditionOfOccurrence",
            attributes: ["id", "name"],
          },
          {
            model: database.teams,
            as: "teamOfOccurrence",
            attributes: ["id", "name"],
          },
        ],
        where: {
          id,
        },
      });
      if (!occurrence) {
        return res.status(404).send({
          message: "Nenhum registro foi encontrado com a ID fornecida.",
        });
      }

      res.status(200).json({ occurrence });
    } catch (error) {
      console.error("error:", error);
      res.status(400).send({ message: error.message });
    }
  }

  async create(req, res) {
    try {
      const {
        occurrenceType_id,
        dateOfOccurrence,
        localType_id,
        zip,
        state,
        city,
        neighborhood,
        avenue,
        narrative,
        condition_id,
        team_id,
      } = req.body;

      const occurrenceTypeDoesNotExist = await database.occurrenceTypes.findOne(
        {
          where: { id: occurrenceType_id },
        }
      );
      if (!occurrenceTypeDoesNotExist) {
        return res.status(404).send({
          message:
            "Nenhum tipo de ocorrência foi encontrado com a ID fornecida.",
        });
      }

      const localTypeDoesNotExist = await database.localTypes.findOne({
        where: { id: localType_id },
      });
      if (!localTypeDoesNotExist) {
        return res.status(404).send({
          message: "Nenhum tipo de local foi encontrado com a ID fornecida.",
        });
      }

      if (condition_id) {
        const conditionDoesNotExist = await database.conditions.findOne({
          where: { id: condition_id },
        });

        if (!conditionDoesNotExist) {
          return res.status(404).send({
            message: "Nenhuma condição foi encontrada com a ID fornecida.",
          });
        }
      }

      if (team_id) {
        const teamDoesNotExist = await database.teams.findOne({
          where: { id: team_id },
        });

        if (!teamDoesNotExist) {
          return res.status(404).send({
            message: "Nenhum time foi encontrado com a ID fornecida.",
          });
        }
      }

      const newOccurrence = await database.occurrences.create({
        id: uuidv4(),
        occurrenceType_id,
        dateOfOccurrence,
        localType_id,
        zip,
        state,
        city,
        neighborhood,
        avenue,
        narrative,
        condition_id,
        team_id,
      });

      res.status(201).json({ newOccurrence });
    } catch (error) {
      console.error("error:", error);
      res.status(400).send({ message: error.message });
    }
  }

  async deleteById(req, res) {
    try {
      const { id } = req.params;

      const occurrence = await database.occurrences.findOne({
        where: {
          id,
        },
      });
      if (!occurrence) {
        return res.status(404).send({
          message: "Nenhum registro foi encontrado com a ID fornecida.",
        });
      }

      await database.occurrences.destroy({
        where: {
          id,
        },
      });

      res.status(200).send({ message: "O registro foi excluído com sucesso." });
    } catch (error) {
      console.error("error:", error);
      res.status(400).send({ message: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const {
        occurrenceType_id,
        dateOfOccurrence,
        localType_id,
        zip,
        state,
        city,
        neighborhood,
        avenue,
        narrative,
        condition_id,
        team_id,
      } = req.body;

      const occurrence = await database.occurrences.findOne({
        where: {
          id,
        },
      });
      if (!occurrence) {
        return res.status(404).send({
          message: "Nenhum registro foi encontrado com a ID fornecida.",
        });
      }

      if (occurrenceType_id) {
        const occurrenceTypeDoesNotExist =
          await database.occurrenceTypes.findOne({
            where: { id: occurrenceType_id },
          });

        if (!occurrenceTypeDoesNotExist) {
          return res.status(404).send({
            message:
              "Nenhum tipo de ocorrência foi encontrado com a ID fornecida.",
          });
        }

        occurrence.occurrenceType_id = occurrenceType_id;
      }
      if (dateOfOccurrence) occurrence.dateOfOccurrence = dateOfOccurrence;
      if (localType_id) {
        const localTypeDoesNotExist = await database.localTypes.findOne({
          where: { id: localType_id },
        });

        if (!localTypeDoesNotExist) {
          return res.status(404).send({
            message: "Nenhum tipo de local foi encontrado com a ID fornecida.",
          });
        }

        occurrence.localType_id = localType_id;
      }
      if (zip) occurrence.zip = zip;
      if (state) occurrence.state = state;
      if (city) occurrence.city = city;
      if (neighborhood) occurrence.neighborhood = neighborhood;
      if (avenue) occurrence.avenue = avenue;
      if (narrative) occurrence.narrative = narrative;
      if (condition_id) {
        const conditionDoesNotExist = await database.conditions.findOne({
          where: { id: condition_id },
        });

        if (!conditionDoesNotExist) {
          return res.status(404).send({
            message: "Nenhuma condição foi encontrada com a ID fornecida.",
          });
        }

        occurrence.condition_id = condition_id;
      }
      if (team_id) {
        const teamDoesNotExist = await database.teams.findOne({
          where: { id: team_id },
        });

        if (!teamDoesNotExist) {
          return res.status(404).send({
            message: "Nenhum time foi encontrado com a ID fornecida.",
          });
        }

        occurrence.team_id = team_id;
      }
      await occurrence.save();
      const updatedOccurrence = await occurrence.reload();

      res.status(200).send({ updatedOccurrence });
    } catch (error) {
      console.error("error:", error);
      res.status(400).send({ message: error.message });
    }
  }
}

module.exports = OccurrenceController;
