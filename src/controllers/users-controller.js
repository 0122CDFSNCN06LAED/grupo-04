const fs = require("fs");
const path = require("path");


const usersFilePath = path.join(__dirname, "../data/users.json");
const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));



const controllers = {
    vendorInformation: (req, res) => {
        const idBuscado = req.params.id;
        const vendorInfo = users.find((user) => user.id == idBuscado);
        res.render("vendorInformation.ejs", { vendorInfo });
    },
    login: (req, res) => {
        res.render("login.ejs");
    },
    loguear: (req, res) => {
        const email = req.body.username;
        const password = req.body.password;
        const usuario = users.find((user) => user.email == email && user.password == password);
        if (usuario == null) {
            res.render("Login", { error: "Login incorrecto" })
        } else {
            req.session.usuarioLogueado = usuario
            res.redirect("index")

        }

    }
};

module.exports = controllers;