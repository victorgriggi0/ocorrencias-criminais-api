const { v4: uuidv4 } = require("uuid");

const database = require("../models");

class TeamController {
  async getAll(_, res) {
    try {
      const teams = await database.teams.findAll({
        order: [["name", "ASC"]],
        include: [
          {
            model: database.users,
            as: "usersInTeam",
            attributes: ["id", "name"],
          },
          {
            model: database.occurrences,
            as: "teamOccurrences",
            /* attributes */
          },
        ],
      });

      res.status(200).json({ teams });
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

      const { count, rows: teams } = await database.teams.findAndCountAll({
        order: [["name", "ASC"]],
        include: [
          {
            model: database.users,
            as: "usersInTeam",
            attributes: ["id", "name"],
          },
          {
            model: database.occurrences,
            as: "teamOccurrences",
            /* attributes */
          },
        ],
        offset,
        limit: pageSize,
      });

      const totalPages = Math.ceil(count / pageSize);

      res.status(200).json({
        teams,
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

      const team = await database.teams.findOne({
        include: [
          {
            model: database.users,
            as: "usersInTeam",
            attributes: ["id", "name"],
          },
          {
            model: database.occurrences,
            as: "teamOccurrences",
            /* attributes */
          },
        ],
        where: {
          id,
        },
      });
      if (!team) {
        return res.status(404).send({
          message: "Nenhum registro foi encontrado com a ID fornecida.",
        });
      }

      res.status(200).json({ team });
    } catch (error) {
      console.error("error:", error);
      res.status(400).send({ message: error.message });
    }
  }

  async create(req, res) {
    try {
      const { name, description } = req.body;

      const team = await database.teams.findOne({
        where: {
          name,
        },
      });
      if (team) {
        return res.status(409).send({
          message:
            "Já existe um registro com este nome. Por favor, escolha um nome diferente.",
        });
      }

      const newTeam = await database.teams.create({
        id: uuidv4(),
        name,
        description,
      });

      res.status(201).json({ newTeam });
    } catch (error) {
      console.error("error:", error);
      res.status(400).send({ message: error.message });
    }
  }

  async deleteById(req, res) {
    try {
      const { id } = req.params;

      const team = await database.teams.findOne({
        where: {
          id,
        },
      });
      if (!team) {
        return res.status(404).send({
          message: "Nenhum registro foi encontrado com a ID fornecida.",
        });
      }

      await database.teams.destroy({
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

      const team = await database.teams.findOne({
        where: {
          id,
        },
      });
      if (!team) {
        return res.status(404).send({
          message: "Nenhum registro foi encontrado com a ID fornecida.",
        });
      }

      if (name) team.name = name;
      if (description) team.description = description;
      await team.save();
      const updatedTeam = await team.reload();

      res.status(200).send({ updatedTeam });
    } catch (error) {
      console.error("error:", error);
      res.status(400).send({ message: error.message });
    }
  }
}

module.exports = TeamController;
