const { v4: uuidv4 } = require("uuid");

const database = require("../models");

class DepartmentController {
  async getAll(_, res) {
    try {
      const departments = await database.departments.findAll({
        order: [["name", "ASC"]],
        include: [
          {
            model: database.users,
            as: "usersInDepartment",
            attributes: ["id", "name"],
          },
        ],
      });

      res.status(200).json({ departments });
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

      const { count, rows: departments } =
        await database.departments.findAndCountAll({
          order: [["name", "ASC"]],
          include: [
            {
              model: database.users,
              as: "usersInDepartment",
              attributes: ["id", "name"],
            },
          ],
          offset,
          limit: pageSize,
        });

      const totalPages = Math.ceil(count / pageSize);

      res.status(200).json({
        departments,
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

      const department = await database.departments.findOne({
        include: [
          {
            model: database.users,
            as: "usersInDepartment",
            attributes: ["id", "name"],
          },
        ],
        where: {
          id,
        },
      });
      if (!department) {
        return res.status(404).send({
          message: "Nenhum registro foi encontrado com a ID fornecida.",
        });
      }

      res.status(200).json({ department });
    } catch (error) {
      console.error("error:", error);
      res.status(400).send({ message: error.message });
    }
  }

  async create(req, res) {
    try {
      const { name, zip, state, city, neighborhood, avenue } = req.body;

      const department = await database.departments.findOne({
        where: {
          name,
        },
      });
      if (department) {
        return res.status(409).send({
          message:
            "Já existe um registro com este nome. Por favor, escolha um nome diferente.",
        });
      }

      const newDepartment = await database.departments.create({
        id: uuidv4(),
        name,
        zip,
        state,
        city,
        neighborhood,
        avenue,
      });

      res.status(201).json({ newDepartment });
    } catch (error) {
      console.error("error:", error);
      res.status(400).send({ message: error.message });
    }
  }

  async deleteById(req, res) {
    try {
      const { id } = req.params;

      const department = await database.departments.findOne({
        where: {
          id,
        },
      });
      if (!department) {
        return res.status(404).send({
          message: "Nenhum registro foi encontrado com a ID fornecida.",
        });
      }

      await database.departments.destroy({
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
      const { name, zip, state, city, neighborhood, avenue } = req.body;

      const department = await database.departments.findOne({
        where: {
          id,
        },
      });
      if (!department) {
        return res.status(404).send({
          message: "Nenhum registro foi encontrado com a ID fornecida.",
        });
      }

      department.name = name;
      department.zip = zip;
      department.state = state;
      department.city = city;
      department.neighborhood = neighborhood;
      department.avenue = avenue;
      await department.save();
      const updatedDepartment = await department.reload();

      res.status(200).send({ updatedDepartment });
    } catch (error) {
      console.error("error:", error);
      res.status(400).send({ message: error.message });
    }
  }
}

module.exports = DepartmentController;
