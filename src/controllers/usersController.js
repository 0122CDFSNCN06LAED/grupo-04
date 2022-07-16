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
    })//.catch(res.send("Hubo un error en la consulta"));  
    //Falta validar que ID que llegue sea correcto
  },
  
  login: (req, res) => {
   /*  db.Users.findAll().then((users) => {
      //console.log(users);
    }); */

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
      email: req.body.email,
      cuit: req.body.cuit,
      password: hashedPassword,
      companyName: req.body.companyName,
      phoneNumber: req.body.contact,
      companyImg: img,
      usercategory_id: 1,
    })
      .then(() => {
        const datosRecibidos = JSON.parse(JSON.stringify(req.body));
        req.session.userLogged = datosRecibidos;
        res.redirect("../");
      })
      .catch((error) => console.log(error));

    /*const datosRecibidos = JSON.parse(JSON.stringify(req.body));

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

    

    /*const urlToRedirect = "vendorInfo/" + idToAssing;
            res.redirect(urlToRedirect);*/
  },
};

module.exports = controllers;