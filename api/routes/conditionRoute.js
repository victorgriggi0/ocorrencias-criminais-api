const { Router } = require("express");

const ConditionController = require("../controllers/conditionController");
const authenticated = require("../middleware/authenticated");

const conditionController = new ConditionController();
const router = Router();

router
  .get("/conditions/all", authenticated, conditionController.getAll)
  .get("/conditions", authenticated, conditionController.get)
  .get("/condition/:id", authenticated, conditionController.getById)
  .post("/condition", authenticated, conditionController.create)
  .delete("/condition/:id", authenticated, conditionController.deleteById)
  .put("/condition/:id", authenticated, conditionController.update);

module.exports = router;
