const res = require("express/lib/response");
const fs = require("fs");
const path = require("path");


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
        const emailAndUsername = req.body.username;
        const password = req.body.password;
        const usuario = users.find((user) => user.email == emailAndUsername || user.userName == emailAndUsername && user.password == password);

        console.log(usuario);
        
        
        if (usuario == null) {
            res.render("users/login", { error: "Login incorrecto" })
        } else {
            req.session.userLogged = usuario;
            
            if(req.body.recordame){
                res.cookie('userEmail', req.body.username, {maxAge: 1000 * 60})
            }
            
            res.redirect("../")          
        } 
            
    },
    logOut: (req, res) => {
        res.clearCookie('userEmail');
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

    store: () => {

    }
};

module.exports = controllers;