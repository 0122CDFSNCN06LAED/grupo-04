const { Router } = require("express");
const usersController = require("../controllers/usersController");

const router = Router();

router.get("/vendorInfo/:id", usersController.vendorInformation);
router.get("/login", usersController.login);
router.post("/login", usersController.loguear)
router.get("/logOut", usersController.logOut)
module.exports = router;