const path = require("path");
const fs = require("fs");
const productsFilePath = path.join(__dirname, "../data/products.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));


module.exports = {
    home: (req, res) => {
        res.render("index.ejs");
    },
    register: (req, res) => {
        res.render("register.ejs");
    },
    productDetail: (req, res) => {
        res.render("productDetail.ejs");
    },

    productCar: (req, res) => {
        res.render("productCar.ejs", {
            products
        });
    },
    login: (req, res) => {
        res.render("login.ejs");
    },
    aboutUs: (req, res) => {
        res.render("aboutUS.ejs");
    },
    vendorInformation: (req, res) => {
        res.render("vendorInformation.ejs");
    }
};