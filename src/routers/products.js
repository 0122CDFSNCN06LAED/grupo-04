const { Router } = require("express");
const productsController = require("../controllers/products-controller");

const router = Router();

// /products 
router.get("/", productsController.index);
router.get("/create", productsController.create);
router.get("/edit/:id", productsController.edit);
router.put("/edit/:id_method=PUT", productsController.update);


module.exports = router