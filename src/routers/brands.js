const { Router } = require("express");
const brandsController = require("../controllers/brandsController");

const router = Router();


router.get("/", brandsController.list);
router.get("/list", brandsController.list);
router.get("/create", brandsController.create);
router.post("/create", brandsController.store);



module.exports = router;