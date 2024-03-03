const { Router } = require("express");

const AuthController = require("../controllers/authController");
const authenticated = require("../middleware/authenticated");

const authController = new AuthController();
const router = Router();

router.post("/auth/login", authController.login);
router.get("/auth/checkuser", authenticated, authController.checkUser);

module.exports = router;
