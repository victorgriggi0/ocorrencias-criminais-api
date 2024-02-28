const { Router } = require("express");

const OccurrenceController = require("../controllers/occurrenceController");
const authenticated = require("../middleware/authenticated");

const occurrenceController = new OccurrenceController();
const router = Router();

router
  .get("/occurrences/all", authenticated, occurrenceController.getAll)
  .get("/occurrences", authenticated, occurrenceController.get)
  .get("/occurrence/:id", authenticated, occurrenceController.getById)
  .post("/occurrence", authenticated, occurrenceController.create)
  .delete("/occurrence/:id", authenticated, occurrenceController.deleteById)
  .put("/occurrence/:id", authenticated, occurrenceController.update);

module.exports = router;
