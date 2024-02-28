const { Router } = require("express");

const AssociationController = require("../controllers/associationController");
const authenticated = require("../middleware/authenticated");

const associationController = new AssociationController();
const router = Router();

router
  .post(
    "/membership/:team_id",
    authenticated,
    associationController.enrollUserInTeamById
  )
  .delete(
    "/membership/:team_id",
    authenticated,
    associationController.deleteUserInTeamById
  );

module.exports = router;
