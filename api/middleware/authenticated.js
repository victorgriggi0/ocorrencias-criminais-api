const { verify, decode } = require("jsonwebtoken");

const jsonSecret = require("../config/jsonSecret");

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send({
      message:
        "Hum... Parece que não conseguimos localizar o seu token de acesso.",
    });
  }

  const [, authToken] = token.split(" ");

  try {
    verify(authToken, jsonSecret.secret);

    const { id, email } = decode(authToken);

    req.userId = id;
    req.userEmail = email;

    return next();
  } catch (error) {
    res
      .status(403)
      .send({ message: "O usuário não é autorizado para acessar esta rota." });
  }
};
