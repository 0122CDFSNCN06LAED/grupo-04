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
    }).catch(res.send("Hubo un error en la consulta"));  
    //Falta validar que ID que llegue sea correcto
  },
  login: (req, res) => {
    db.Users.findAll().then((users) => {
      console.log(users);
    });

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
     
  loguear: (req, res) => {
    const email = req.body.username;
    const password = req.body.password;
    const usuario = users.find(
      (user) => user.email == email /*&& user.password == password*/
    );

    if (bcrypt.compareSync(password, usuario.password)) {
      req.session.userLogged = usuario;
      if (req.body.recordame) {
        res.cookie("userEmail", req.body.username, { maxAge: 1000 * 60 });
      }
      res.redirect("../");
    } else {
      res.render("users/login", { error: "Login incorrecto" });
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
    const datosRecibidos = JSON.parse(JSON.stringify(req.body));

    const acumulador = [];

    for (i = 0; i < users.length; i++) {
      acumulador.push(users[i].id);
    }

    const biggerId = Math.max.apply(null, acumulador);
    const idToAssing = biggerId + 1;
    datosRecibidos.id = idToAssing;
    datosRecibidos.password = bcrypt.hashSync(datosRecibidos.password, 10);

    if (req.file) {
      datosRecibidos.img = req.file.filename;
    } else {
      datosRecibidos.img = "default-avatar.png";
    }

    users.push(datosRecibidos);
    const usersWithNew = JSON.stringify(users);

    fs.writeFileSync(usersFilePath, usersWithNew);

    req.session.userLogged = datosRecibidos;
    res.redirect("../");

    /*const urlToRedirect = "vendorInfo/" + idToAssing;
            res.redirect(urlToRedirect);*/
  },
};

module.exports = controllers;