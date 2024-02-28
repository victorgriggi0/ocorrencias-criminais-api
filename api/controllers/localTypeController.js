const { v4: uuidv4 } = require("uuid");

const database = require("../models");

class LocalTypeController {
  async getAll(_, res) {
    try {
      const localTypes = await database.localTypes.findAll({
        order: [["name", "ASC"]],
        include: [
          {
            model: database.occurrences,
            as: "occurrencesInTypeOfLocation",
            /* attributes */
          },
        ],
      });

      res.status(200).json({ localTypes });
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

      const { count, rows: localTypes } =
        await database.localTypes.findAndCountAll({
          order: [["name", "ASC"]],
          include: [
            {
              model: database.occurrences,
              as: "occurrencesInTypeOfLocation",
              /* attributes */
            },
          ],
          offset,
          limit: pageSize,
        });

      const totalPages = Math.ceil(count / pageSize);

      res.status(200).json({
        localTypes,
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

      const localType = await database.localTypes.findOne({
        include: [
          {
            model: database.occurrences,
            as: "occurrencesInTypeOfLocation",
            /* attributes */
          },
        ],
        where: {
          id,
        },
      });
      if (!localType) {
        return res.status(404).send({
          message: "Nenhum registro foi encontrado com a ID fornecida.",
        });
      }

      res.status(200).json({ localType });
    } catch (error) {
      console.error("error:", error);
      res.status(400).send({ message: error.message });
    }
  }

  async create(req, res) {
    try {
      const { name } = req.body;

      const localType = await database.localTypes.findOne({
        where: {
          name,
        },
      });
      if (localType) {
        return res.status(409).send({
          message:
            "Já existe um registro com este nome. Por favor, escolha um nome diferente.",
        });
      }

      const newLocalType = await database.localTypes.create({
        id: uuidv4(),
        name,
      });

      res.status(201).json({ newLocalType });
    } catch (error) {
      console.error("error:", error);
      res.status(400).send({ message: error.message });
    }
  }

  async deleteById(req, res) {
    try {
      const { id } = req.params;

      const localType = await database.localTypes.findOne({
        where: {
          id,
        },
      });
      if (!localType) {
        return res.status(404).send({
          message: "Nenhum registro foi encontrado com a ID fornecida.",
        });
      }

      await database.localTypes.destroy({
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

      const localType = await database.localTypes.findOne({
        where: {
          id,
        },
      });
      if (!localType) {
        return res.status(404).send({
          message: "Nenhum registro foi encontrado com a ID fornecida.",
        });
      }

      if (name) localType.name = name;
      await localType.save();
      const updatedLocalType = await localType.reload();

      res.status(200).send({ updatedLocalType });
    } catch (error) {
      console.error("error:", error);
      res.status(400).send({ message: error.message });
    }
  }
}

module.exports = LocalTypeController;
