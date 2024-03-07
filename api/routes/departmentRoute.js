const { Router } = require("express");

const DepartmentController = require("../controllers/departmentController");
const authenticated = require("../middleware/authenticated");
const comprehensivePermissions = require("../middleware/comprehensivePermissions");

const departmentController = new DepartmentController();
const router = Router();

/* posteriormente, proteger as rotas por meio do middleware */

router
  .get("/departments/all", authenticated, departmentController.getAll)
  .get("/departments", authenticated, departmentController.get)
  .get("/department/:id", authenticated, departmentController.getById)
  .post(
    "/department",
    authenticated,
    comprehensivePermissions(["8afe78fe-24c0-4dab-8eaf-6e9286aacd1f"]),
    departmentController.create
  )
  .delete(
    "/department/:id",
    authenticated,
    comprehensivePermissions(["2d110185-852f-42aa-9c0f-48782b4cd424"]),
    departmentController.deleteById
  )
  .put(
    "/department/:id",
    authenticated,
    comprehensivePermissions(["c153dfe8-3daa-4ee9-8e90-9c9f7eb9dc6d"]),
    departmentController.update
  );

module.exports = router;
