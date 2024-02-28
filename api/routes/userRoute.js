const { Router } = require("express");

const UserController = require("../controllers/userController");
const authenticated = require("../middleware/authenticated");

const userController = new UserController();
const router = Router();

router
  .get("/users/all", authenticated, userController.getAll)
  .get("/users", authenticated, userController.get)
  .get("/user/:id", authenticated, userController.getById)
  .post("/user", userController.create)
  .delete("/user/:id", authenticated, userController.deleteById)
  .put("/user/:id", authenticated, userController.update);

module.exports = router;
