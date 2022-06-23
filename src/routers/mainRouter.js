const { Router } = require("express");
const mainController = require("../controllers/mainController");

const router = Router();


router.get("/", mainController.home);
router.get("/productCar", mainController.productCar);
router.get("/register", mainController.register);
router.get("/aboutUs", mainController.aboutUs);
router.get("/informacionVendedor", mainController.informacionVendedor);



module.exports = router;