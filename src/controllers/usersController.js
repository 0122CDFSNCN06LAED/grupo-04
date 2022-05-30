const res = require("express/lib/response");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");


const usersFilePath = path.join(__dirname, "../data/users.json");
const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));



const controllers = {
    vendorInformation: (req, res) => {
        const idBuscado = req.params.id;
        const vendorInfo = users.find((user) => user.id == idBuscado);
        res.render("users/vendorInformation.ejs", { vendorInfo });
    },
    login: (req, res) => {
        res.render("users/login.ejs", { error: "" });
    },
    loguear: (req, res) => {
        const email = req.body.username;
        const password = req.body.password;
        const usuario = users.find((user) => user.email == email /*&& user.password == password*/);

        if (bcrypt.compareSync(password, usuario.password)) {
            req.session.userLogged = usuario;
            res.redirect("../");
        } else {
            res.render("users/login", { error: "Login incorrecto" })
        };

    },
    logOut: (req, res) => {
        req.session.userLogged = null;
        res.redirect("../")

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

          //chequeamos si enviaron imagen o no
            const acumulador = [];

            for (i = 0; i < users.length; i++) {
              acumulador.push(users[i].id);
            }

            const biggerId = Math.max.apply(null, acumulador);
            const idToAssing = biggerId + 1;
            datosRecibidos.id = idToAssing;
            datosRecibidos.password = bcrypt.hashSync(datosRecibidos.password, 10);

            if(req.file) {
                 datosRecibidos.img = req.file.filename;
                } else {
                datosRecibidos.img = "default-avatar.png";
                };

            users.push(datosRecibidos);
            const usersWithNew = JSON.stringify(users);

            fs.writeFileSync(usersFilePath, usersWithNew);

            const urlToRedirect = "vendorInfo/" + idToAssing;
            res.redirect(urlToRedirect);
        }
};

module.exports = controllers;