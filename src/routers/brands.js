const { Router } = require("express");
const brandsController = require("../controllers/brandsController");
const router = Router();
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", authMiddleware, brandsController.list);
router.get("/list", authMiddleware, brandsController.list);
router.get("/create", authMiddleware, brandsController.create);
router.post("/create", authMiddleware, brandsController.store);



module.exports = router;