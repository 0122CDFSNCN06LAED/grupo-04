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
/*se comineza a probar validaciones, pero no está en funcionamiento */
const validations = [
    body('productName').notEmpty().isLength({ min: 5 }),
    body('description').notEmpty().isLength({ min: 100 }),
    body('models').notEmpty(),
    body('price').notEmpty().isNumeric(),
    body('minBuy').notEmpty().isNumeric(),
    body('category').notEmpty(),

]




// /products 
router.get("/", productsController.list);
router.get("/create", productsController.create);
router.post("/create", uploadFile.single("img"), validations, productsController.store)
router.get("/edit/:id", productsController.edit);
router.put("/edit/:id", uploadFile.single("img"), productsController.update);
router.delete("/delete/:id", productsController.destroy);
router.get("/detail/:id", productsController.detail);
router.get("/search", productsController.search);
router.get("/agregar/:id", productsController.add);



module.exports = router