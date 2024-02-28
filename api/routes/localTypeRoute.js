const { Router } = require("express");

const LocalTypeController = require("../controllers/localTypeController");
const authenticated = require("../middleware/authenticated");

const localTypeController = new LocalTypeController();
const router = Router();

router
  .get("/localtypes/all", authenticated, localTypeController.getAll)
  .get("/localtypes", authenticated, localTypeController.get)
  .get("/localtype/:id", authenticated, localTypeController.getById)
  .post("/localtype", authenticated, localTypeController.create)
  .delete("/localtype/:id", authenticated, localTypeController.deleteById)
  .put("/localtype/:id", authenticated, localTypeController.update);

module.exports = router;
