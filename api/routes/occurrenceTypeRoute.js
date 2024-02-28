const { Router } = require("express");

const OccurrenceTypeController = require("../controllers/occurrenceTypeController");
const authenticated = require("../middleware/authenticated");

const occurrenceTypeController = new OccurrenceTypeController();
const router = Router();

router
  .get("/occtypes/all", authenticated, occurrenceTypeController.getAll)
  .get("/occtypes", authenticated, occurrenceTypeController.get)
  .get("/occtype/:id", authenticated, occurrenceTypeController.getById)
  .post("/occtype", authenticated, occurrenceTypeController.create)
  .delete("/occtype/:id", authenticated, occurrenceTypeController.deleteById)
  .put("/occtype/:id", authenticated, occurrenceTypeController.update);

module.exports = router;
