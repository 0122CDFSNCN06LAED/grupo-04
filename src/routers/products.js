const { Router } = require("express");
const productsController = require("../controllers/productsController");
const path = require("path");
const router = Router();
const multer = require("multer");
const { body } = require('express-validator');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const pathForMulter = 'public/img/articulos/';
        cb(null, pathForMulter);
    },
    filename: function(req, file, cb) {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    }
})
const uploadFile = multer({ storage });
const validations = require("../middlewares/createProductValidation")
const validationEdit = require("../middlewares/ediProductValidation")
    // /products 
router.get("/", productsController.list);
router.get("/category/:id?", productsController.listByCategory);
router.get("/create", productsController.create);
router.post("/create", uploadFile.single("img"), validations, productsController.store)
router.get("/edit/:id", productsController.edit);
router.put("/edit/:id", uploadFile.single("img"), validationEdit, productsController.update);
router.delete("/delete/:id", productsController.destroy);
router.get("/detail/:id", productsController.detail);
router.get("/search", productsController.search);
router.get("/agregar/:id", productsController.add);
router.post("/productCart", productsController.addProduct)



module.exports = router