const path = require("path");

module.exports = {
    home: (req, res) => {
        res.render("index.ejs");
    },
    register: (req, res) => {
        res.redirect("users/register");
    },
    productDetail: (req, res) => {
        res.render("productDetail.ejs");
    },

    productCar: (req, res) => {
        res.render("productCar.ejs");
    },
    aboutUs: (req, res) => {
        res.render("aboutUs.ejs");
    },
    informacionVendedor: (req, res) => {
        res.render("informacionVendedor.ejs");
    }
};