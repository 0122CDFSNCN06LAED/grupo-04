const { Router } = require("express");
const usersController = require("../controllers/users-controller");

const router = Router();

router.get("/vendorInfo/:id", usersController.vendorInformation);

module.exports = router;
