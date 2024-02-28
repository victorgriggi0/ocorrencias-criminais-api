const { Router } = require("express");

const TeamController = require("../controllers/teamController");
const authenticated = require("../middleware/authenticated");

const teamController = new TeamController();
const router = Router();

router
  .get("/teams/all", authenticated, teamController.getAll)
  .get("/teams", authenticated, teamController.get)
  .get("/team/:id", authenticated, teamController.getById)
  .post("/team", authenticated, teamController.create)
  .delete("/team/:id", authenticated, teamController.deleteById)
  .put("/team/:id", authenticated, teamController.update);

module.exports = router;
