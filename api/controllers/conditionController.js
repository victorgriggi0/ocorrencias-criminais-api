const { v4: uuidv4 } = require("uuid");

const database = require("../models");

class ConditionController {
  async getAll(_, res) {
    try {
      const conditions = await database.conditions.findAll({
        order: [["name", "ASC"]],
        include: [
          {
            model: database.occurrences,
            as: "occurrencesInCondition",
            /* attributes */
          },
        ],
      });

      res.status(200).json({ conditions });
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

      const { count, rows: conditions } =
        await database.conditions.findAndCountAll({
          order: [["name", "ASC"]],
          include: [
            {
              model: database.occurrences,
              as: "occurrencesInCondition",
              /* attributes */
            },
          ],
          offset,
          limit: pageSize,
        });

      const totalPages = Math.ceil(count / pageSize);

      res.status(200).json({
        conditions,
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

      const condition = await database.conditions.findOne({
        include: [
          {
            model: database.occurrences,
            as: "occurrencesInCondition",
            /* attributes */
          },
        ],
        where: {
          id,
        },
      });
      if (!condition) {
        return res.status(404).send({
          message: "Nenhum registro foi encontrado com a ID fornecida.",
        });
      }

      res.status(200).json({ condition });
    } catch (error) {
      console.error("error:", error);
      res.status(400).send({ message: error.message });
    }
  }

  async create(req, res) {
    try {
      const { name, description } = req.body;

      const condition = await database.conditions.findOne({
        where: {
          name,
        },
      });
      if (condition) {
        return res.status(409).send({
          message:
            "Já existe um registro com este nome. Por favor, escolha um nome diferente.",
        });
      }

      const newCondition = await database.conditions.create({
        id: uuidv4(),
        name,
        description,
      });

      res.status(201).json({ newCondition });
    } catch (error) {
      console.error("error:", error);
      res.status(400).send({ message: error.message });
    }
  }

  async deleteById(req, res) {
    try {
      const { id } = req.params;

      const condition = await database.conditions.findOne({
        where: {
          id,
        },
      });
      if (!condition) {
        return res.status(404).send({
          message: "Nenhum registro foi encontrado com a ID fornecida.",
        });
      }

      await database.conditions.destroy({
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
      const { name, description } = req.body;

      const condition = await database.conditions.findOne({
        where: {
          id,
        },
      });
      if (!condition) {
        return res.status(404).send({
          message: "Nenhum registro foi encontrado com a ID fornecida.",
        });
      }

      if (name) condition.name = name;
      if (description) condition.description = description;
      await condition.save();
      const updatedCondition = await condition.reload();

      res.status(200).send({ updatedCondition });
    } catch (error) {
      console.error("error:", error);
      res.status(400).send({ message: error.message });
    }
  }
}

module.exports = ConditionController;
