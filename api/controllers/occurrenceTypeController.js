const { v4: uuidv4 } = require("uuid");

const database = require("../models");

class OccurrenceTypeController {
  async getAll(_, res) {
    try {
      const occurrenceTypes = await database.occurrenceTypes.findAll({
        order: [["name", "ASC"]],
        include: [
          {
            model: database.occurrences,
            as: "occurrencesOfType",
            /* attributes */
          },
        ],
      });

      res.status(200).json({ occurrenceTypes });
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

      const { count, rows: occurrenceTypes } =
        await database.occurrenceTypes.findAndCountAll({
          order: [["name", "ASC"]],
          include: [
            {
              model: database.occurrences,
              as: "occurrencesOfType",
              /* attributes */
            },
          ],
          offset,
          limit: pageSize,
        });

      const totalPages = Math.ceil(count / pageSize);

      res.status(200).json({
        occurrenceTypes,
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

      const occurrenceType = await database.occurrenceTypes.findOne({
        include: [
          {
            model: database.occurrences,
            as: "occurrencesOfType",
            /* attributes */
          },
        ],
        where: {
          id,
        },
      });
      if (!occurrenceType) {
        return res.status(404).send({
          message: "Nenhum registro foi encontrado com a ID fornecida.",
        });
      }

      res.status(200).json({ occurrenceType });
    } catch (error) {
      console.error("error:", error);
      res.status(400).send({ message: error.message });
    }
  }

  async create(req, res) {
    try {
      const { name } = req.body;

      const occurrenceType = await database.occurrenceTypes.findOne({
        where: {
          name,
        },
      });
      if (occurrenceType) {
        return res.status(409).send({
          message:
            "Já existe um registro com este nome. Por favor, escolha um nome diferente.",
        });
      }

      const newOccurrenceType = await database.occurrenceTypes.create({
        id: uuidv4(),
        name,
      });

      res.status(201).json({ newOccurrenceType });
    } catch (error) {
      console.error("error:", error);
      res.status(400).send({ message: error.message });
    }
  }

  async deleteById(req, res) {
    try {
      const { id } = req.params;

      const occurrenceType = await database.occurrenceTypes.findOne({
        where: {
          id,
        },
      });
      if (!occurrenceType) {
        return res.status(404).send({
          message: "Nenhum registro foi encontrado com a ID fornecida.",
        });
      }

      await database.occurrenceTypes.destroy({
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
      const { name } = req.body;

      const occurrenceType = await database.occurrenceTypes.findOne({
        where: {
          id,
        },
      });
      if (!occurrenceType) {
        return res.status(404).send({
          message: "Nenhum registro foi encontrado com a ID fornecida.",
        });
      }

      if (name) occurrenceType.name = name;
      await occurrenceType.save();
      const updatedOccurrenceType = await occurrenceType.reload();

      res.status(200).send({ updatedOccurrenceType });
    } catch (error) {
      console.error("error:", error);
      res.status(400).send({ message: error.message });
    }
  }
}

module.exports = OccurrenceTypeController;
