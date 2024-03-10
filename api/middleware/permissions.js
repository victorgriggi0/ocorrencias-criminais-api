const database = require("../models");

const permissions = (permissionsList) => {
  return async (req, res, next) => {
    const { userID } = req;

    const user = await database.users.findOne({
      include: [
        {
          model: database.permissions,
          as: "permissionsOfUser",
          attributes: ["id", "name"],
        },
      ],
      where: {
        id: userID,
      },
    });
    if (!user) {
      return res.status(404).send({
        message: "O usuário informado não foi encontrado em nosso sistema.",
      });
    }

    const registeredPermissions = user.permissionsOfUser
      .map((permission) => permission.id)
      .some((permission) => permissionsList.includes(permission));
    if (!registeredPermissions) {
      return res.status(403).send({
        message: "O usuário não é autorizado para acessar esta rota.",
      });
    }

    return next();
  };
};

module.exports = permissions;
