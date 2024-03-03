const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");

const database = require("../models");
const jsonSecret = require("../config/jsonSecret");

class AuthController {
  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).send({
          message:
            "Erro de login: É necessário inserir um e-mail e uma senha válidos.",
        });
      }

      const emailLowerCase = email.toLowerCase();

      const user = await database.users.findOne({
        where: {
          email: emailLowerCase,
        },
      });
      if (!user) {
        return res
          .status(404)
          .send({ message: "Não há uma conta com esse endereço de email." });
      }

      const passwordMatch = await compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).send({
          message: "Endereço de email ou senha inválidos! Tente novamente.",
        });
      }

      const authToken = sign(
        {
          id: user.id,
          email: user.email,
        },
        jsonSecret.secret,
        {
          expiresIn: 3600,
        }
      );

      res.status(200).json({ authToken });
    } catch (error) {
      console.error("error:", error);
      res.status(400).send({ message: error.message });
    }
  }

  async checkUser(req, res) {
    try {
      const { userId } = req;

      const user = await database.users.findOne({
        attributes: ["id", "name"],
        include: [
          {
            model: database.roles,
            as: "rolesOfUser",
            attributes: ["id", "name"],
            through: { attributes: [] },
            include: [
              {
                model: database.permissions,
                as: "permissionsOfRole",
                attributes: ["id", "name"],
                through: { attributes: [] },
              },
            ],
          },
          {
            model: database.permissions,
            as: "permissionsOfUser",
            attributes: ["id", "name"],
            through: { attributes: [] },
          },
        ],
        where: {
          id: userId,
        },
      });
      if (!user) {
        return res.status(404).send({
          message: "Nenhum usuário foi encontrado com a ID fornecida.",
        });
      }

      res.status(200).json({ user });
    } catch (error) {
      console.error("error:", error);
      res.status(400).send({ message: error.message });
    }
  }
}

module.exports = AuthController;
