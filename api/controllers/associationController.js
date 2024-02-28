const Sequelize = require("sequelize");

const database = require("../models");

class associationController {
  async enrollUserInTeamById(req, res) {
    try {
      const { team_id } = req.params;
      const { user_id } = req.body;

      const team = await database.teams.findOne({
        include: [
          {
            model: database.users,
            as: "usersInTeam",
            attributes: ["id", "name"],
          },
        ],
        where: {
          id: team_id,
        },
      });
      if (!team) {
        return res.status(404).send({
          message: "Nenhum registro foi encontrado com a ID fornecida.",
        });
      }

      if (user_id) {
        const teamUsers = await team.getUsersInTeam();

        const userIdsToAdd = user_id.filter(
          (id) => !teamUsers.some((teamUser) => teamUser.id === id)
        );

        if (userIdsToAdd.length) {
          const usersToAdd = await database.users.findAll({
            where: { id: { [Sequelize.Op.in]: userIdsToAdd } },
          });

          await team.addUsersInTeam(usersToAdd);
        } else {
          return res.status(409).send({
            message: "Todos os usuários especificados já estão adicionados.",
          });
        }
      }

      const teamWithNewUsers = await team.reload();

      return res.status(200).send({ teamWithNewUsers });
    } catch (error) {
      console.error("error:", error);
      res.status(400).send({ message: error.message });
    }
  }

  async deleteUserInTeamById(req, res) {
    try {
      const { team_id } = req.params;
      const { user_id } = req.body;

      const team = await database.teams.findOne({
        include: [
          {
            model: database.users,
            as: "usersInTeam",
            attributes: ["id", "name"],
          },
        ],
        where: {
          team_id,
        },
      });
      if (!team) {
        return res.status(404).send({
          message: "Nenhum registro foi encontrado com a ID fornecida.",
        });
      }

      if (user_id) {
        const teamUsers = await team.getUsersInTeam();

        const userIdsToRemove = teamUsers
          .filter((user) => user_id.includes(user.id))
          .map((user) => user.id);

        if (userIdsToRemove.length) {
          await team.removeUsersInTeam(userIdsToRemove);
        } else {
          return res.status(404).send({
            message: "Nenhum usuário válido encontrado para remover.",
          });
        }
      }

      const teamWithNewUsers = await team.reload();

      return res.status(200).send({ teamWithNewUsers });
    } catch (error) {
      console.error("error:", error);
      res.status(400).send({ message: error.message });
    }
  }
}

module.exports = associationController;
