const { Router } = require("express");
const usersController = require("../controllers/users-controller");

const router = Router();

router.get("/vendorInfo/:id", usersController.vendorInformation);
router.get("/login", usersController.login);
router.post("/login", usersController.loguear)
module.exports = router;