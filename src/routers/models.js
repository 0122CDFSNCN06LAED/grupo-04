const { Router } = require("express");
const modelsController = require("../controllers/modelsController");

const router = Router();


router.get("/", modelsController.list);
router.get("/list", modelsController.list);
router.get("/create", modelsController.create);
router.post("/create", modelsController.store);



module.exports = router;