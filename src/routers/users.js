const { Router } = require("express");
const usersController = require("../controllers/usersController");
const path = require("path");
const router = Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const pathForMulter = "public/img/users/avatars/";
    cb(null, pathForMulter);
  },
  filename: function(req, file, cb) {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

const uploadFile = multer({ storage });




router.get("/vendorInfo/:id", usersController.vendorInformation);
router.get("/login", usersController.login);
router.post("/login", usersController.loguear)
router.get("/logOut", usersController.logOut)
router.get("/register", usersController.register);
router.get("/test", usersController.test);
router.post("/register", uploadFile.single("img"), usersController.store);
router.get("/edit/", usersController.edit);
router.get("/edit/:id", usersController.edit);
router.put("/edit/:id", uploadFile.single("img"), usersController.update);
router.delete("/delete/:id", usersController.destroy);



module.exports = router;