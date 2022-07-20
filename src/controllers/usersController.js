const res = require("express/lib/response");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
let db = require("../database/models")

const usersFilePath = path.join(__dirname, "../data/users.json");
const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));



const controllers = {
  vendorInformation: (req, res) => {
    const idBuscado = req.params.id;
    db.Users.findByPk(idBuscado).then((vendorInfo) => {
      res.render("users/vendorInformation.ejs", { vendorInfo });
    })
  },
  
  login: (req, res) => {
   
    res.render("users/login.ejs", { error: "" });
  },

  test: (req, res) => {
    db.Users.findAll({include: 
        [{ association: 'usersCategories'
    }]
    }).then((users) => {
        res.render("users/usersTest.ejs", { usuarios: users});
    });
     },
     
  loguear: async (req, res) => {
    const emailRecibido = req.body.username;
    const password = req.body.password;
    
    const resultado = await db.Users.findAll({
      where: {
        email: emailRecibido,
      }
    });

      if (resultado[0] == undefined) {
        res.render("users/login", { error: "Login incorrecto" });
      } else {
    
      if (bcrypt.compareSync(password, resultado[0].password)) {
      req.session.userLogged = resultado[0];
      console.log(req.session.userLogged);

      if (req.body.recordame) {
        res.cookie("userEmail", req.body.username, { maxAge: 1000 * 60 });
      }
      res.redirect("../");
      
    } else {
      res.render("users/login", { error: "Login incorrecto" });
    };
      }
     
  },
  logOut: (req, res) => {
    res.clearCookie("userEmail");
    req.session.userLogged = null;
    res.redirect("../");
  },

  register: (req, res) => {
    if (req.session.userLogged) {
      res.redirect("../");
    } else {
      res.render("users/register");
    }
  },

  store: (req, res) => {
    var img = null;

    if (req.file) {
      img = req.file.filename;
    } else {
      img = "default-avatar.png";
    }

    const hashedPassword = bcrypt.hashSync(req.body.password, 10);


    db.Users.create({
      userName: req.body.userName,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      cuit: req.body.cuit,
      //password: hashedPassword,
      companyName: req.body.companyName,
      phoneNumber: req.body.contact,
      companyImg: img,
      usercategory_id: 2,
    })
      .then((newUser) => {
        const datosRecibidos = JSON.parse(JSON.stringify(req.body));
        datosRecibidos.id = newUser.id;
        req.session.userLogged = datosRecibidos;
        res.redirect("../");  
      })
      .catch((error) => console.log(error));

  },

  edit: (req, res) => { 

    if (req.session.userLogged) {
      console.log("aquí te va:" , req.session.userLogged);
      const userId = req.session.userLogged.id;
      const paramsId = req.params.id;
      if (!paramsId) {
        res.redirect(`/users/edit/${userId}`)
      } else if (paramsId != userId) {
        res.redirect(`/users/edit/${userId}`)
      } else {
        db.Users.findByPk(paramsId).then((usuario) => { 
          console.log(userId)
          res.render("users/edit", { u: usuario  })
        });        
      };
    } else {
      res.redirect("/users/register");
    }
  },

  update: (req, res) => {
    const userId = req.session.userLogged.id;
    const paramsId = req.params.id;
    if (paramsId && userId == paramsId) {

      var img = null;

      if (req.file) {
        img = req.file.filename;
      } else {
        img = req.session.userLogged.img ;
      }
      
      var passwordChange = null;
      
      if (req.body.password && req.body.password == req.body.passwordRepeat) {
        passwordChange = true;
      }

      const hashedPassword = bcrypt.hashSync(req.body.password, 10);

      db.Users.update({
        userName: req.body.userName,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        cuit: req.body.cuit,
        password: passwordChange ? hashedPassword : req.session.userLogged.password,
        companyName: req.body.companyName,
        phoneNumber: req.body.contact,
        companyImg: img,
      },{
        where: { id: userId}
      }).then((newUser) => {
        const datosRecibidos = JSON.parse(JSON.stringify(req.body));
        datosRecibidos.id = userId;
        req.session.userLogged = datosRecibidos;
        res.redirect(`/users/edit/${userId}`)
      })
      .catch((error) => console.log(error));

    } else {
      res.send("paramsId y sessionId no coinciden");
    }
  },
  destroy: (req, res) => {
    const userId = req.session.userLogged.id;
    const paramsId = req.params.id;
    if (paramsId && userId == paramsId) {
    db.Users.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
                res.redirect("/users/logOut")
            });
    } else {
      res.send("paramsId y sessionId no coinciden");
    }
      
}};

module.exports = controllers;