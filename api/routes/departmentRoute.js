const { Router } = require("express");

const DepartmentController = require("../controllers/departmentController");
const authenticated = require("../middleware/authenticated");

const departmentController = new DepartmentController();
const router = Router();

/* posteriormente, proteger as rotas por meio do middleware */

router
  .get("/departments/all", authenticated, departmentController.getAll)
  .get("/departments", authenticated, departmentController.get)
  .get("/department/:id", authenticated, departmentController.getById)
  .post("/department", authenticated, departmentController.create)
  .delete("/department/:id", authenticated, departmentController.deleteById)
  .put("/department/:id", authenticated, departmentController.update);

module.exports = router;
