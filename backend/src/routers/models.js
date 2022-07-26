const { Router } = require("express");
const modelsController = require("../controllers/modelsController");
const router = Router();
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", authMiddleware, modelsController.list);
router.get("/list", authMiddleware, modelsController.list);
router.get("/create", authMiddleware, modelsController.create);
router.post("/create", authMiddleware, modelsController.store);



module.exports = router;