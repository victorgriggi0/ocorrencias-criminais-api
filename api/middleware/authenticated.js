const { verify } = require("jsonwebtoken");

const jsonSecret = require("../config/jsonSecret");

module.exports = async (req, res, next) => {
  const token = req.cookies["authToken"];

  if (!token) {
    return res.status(401).send({
      message:
        "Hum... Parece que não conseguimos localizar o seu token de acesso.",
    });
  }

  try {
    const decoded = verify(token, jsonSecret.secret);

    req.userID = decoded.userID;

    return next();
  } catch (error) {
    res
      .status(403)
      .send({ message: "O usuário não é autorizado para acessar esta rota." });
  }
};
