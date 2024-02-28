const { v4: uuidv4 } = require("uuid");
const { hash } = require("bcryptjs");
const Sequelize = require("sequelize");

const database = require("../models");

class UserController {
  async getAll(_, res) {
    try {
      const users = await database.users.findAll({
        order: [["name", "ASC"]],
        include: [
          {
            model: database.roles,
            as: "rolesOfUser",
            attributes: ["id", "name"],
          },
          {
            model: database.permissions,
            as: "permissionsOfUser",
            attributes: ["id", "name"],
          },
          {
            model: database.departments,
            as: "departmentOfUser",
            attributes: ["id", "name"],
          },
          {
            model: database.teams,
            as: "teamsOfUser",
            attributes: ["id", "name"],
          },
        ],
      });

      res.status(200).json({ users });
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

      const { count, rows: users } = await database.users.findAndCountAll({
        order: [["name", "ASC"]],
        include: [
          {
            model: database.roles,
            as: "rolesOfUser",
            attributes: ["id", "name"],
          },
          {
            model: database.permissions,
            as: "permissionsOfUser",
            attributes: ["id", "name"],
          },
          {
            model: database.departments,
            as: "departmentOfUser",
            attributes: ["id", "name"],
          },
          {
            model: database.teams,
            as: "teamsOfUser",
            attributes: ["id", "name"],
          },
        ],
        offset,
        limit: pageSize,
      });

      const totalPages = Math.ceil(count / pageSize);

      res.status(200).json({
        users,
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

      const user = await database.users.findOne({
        include: [
          {
            model: database.roles,
            as: "rolesOfUser",
            attributes: ["id", "name"],
          },
          {
            model: database.permissions,
            as: "permissionsOfUser",
            attributes: ["id", "name"],
          },
          {
            model: database.departments,
            as: "departmentOfUser",
            attributes: ["id", "name"],
          },
          {
            model: database.roles,
            as: "rolesOfUser",
            attributes: ["id", "name"],
          },
        ],
        where: {
          id,
        },
      });
      if (!user) {
        return res.status(404).send({
          message: "Nenhum registro foi encontrado com a ID fornecida.",
        });
      }

      res.status(200).json({ user });
    } catch (error) {
      console.error("error:", error);
      res.status(400).send({ message: error.message });
    }
  }

  async create(req, res) {
    try {
      const { name, email, password, department_id } = req.body;

      const emailLowerCase = email.toLowerCase();

      const user = await database.users.findOne({
        where: {
          email: emailLowerCase,
        },
      });
      if (user) {
        return res.status(409).send({
          message: "Já existe uma conta da com este endereço de email.",
        });
      }

      const passwordHash = await hash(password, 10);

      const departmentDoesNotExist = await database.departments.findOne({
        where: { id: department_id },
      });
      if (!departmentDoesNotExist) {
        return res.status(404).send({
          message: "Nenhum departamento foi encontrado com a ID fornecida.",
        });
      }

      const newUser = await database.users.create({
        id: uuidv4(),
        name,
        email: emailLowerCase,
        password: passwordHash,
        department_id,
      });

      res.status(201).json({ newUser });
    } catch (error) {
      console.error("error:", error);
      res.status(400).send({ message: error.message });
    }
  }

  async deleteById(req, res) {
    try {
      const { id } = req.params;

      const user = await database.users.findOne({
        where: {
          id,
        },
      });
      if (!user) {
        return res.status(404).send({
          message: "Nenhum registro foi encontrado com a ID fornecida.",
        });
      }

      await database.users.destroy({
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
      const { name, email, department_id } = req.body;

      const user = await database.users.findOne({
        where: {
          id,
        },
      });
      if (!user) {
        return res.status(404).send({
          message: "Nenhum registro foi encontrado com a ID fornecida.",
        });
      }

      if (name) user.name = name;
      if (email) {
        const emailLowerCase = email.toLowerCase();

        const existingUserWithEmail = await database.users.findOne({
          where: {
            email: emailLowerCase,
            id: {
              [Sequelize.Op.ne]: id,
            },
          },
        });

        if (existingUserWithEmail) {
          return res.status(409).send({
            message: "Já existe uma conta com este endereço de e-mail.",
          });
        }

        user.email = emailLowerCase;
      }
      if (department_id) {
        const departmentDoesNotExist = await database.departments.findOne({
          where: { id: department_id },
        });

        if (!departmentDoesNotExist) {
          return res.status(404).send({
            message: "Nenhum departamento foi encontrado com a ID fornecida.",
          });
        }

        user.department_id = department_id;
      }
      await user.save();
      const updatedUser = await user.reload();

      res.status(200).send({ updatedUser });
    } catch (error) {
      console.error("error:", error);
      res.status(400).send({ message: error.message });
    }
  }
}

module.exports = UserController;
