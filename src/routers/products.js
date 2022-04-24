const { Router } = require("express");
const productsController = require("../controllers/products-controller");

const router = Router();

// /products 
router.get("/", productsController.index);


module.exports = router
