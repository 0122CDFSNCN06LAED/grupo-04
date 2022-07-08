const path = require("path");
const fs = require("fs");

const productsFilePath = path.join(__dirname, "../data/products.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));



module.exports = {
    home: (req, res) => {
        res.render("index.ejs", {
          products,
        });
    },
    register: (req, res) => {
        res.redirect("users/register");
    },
    productDetail: (req, res) => {
        res.render("productDetail.ejs");
    },

    productCart: (req, res) => {
        res.render("products/productCart.ejs");
    },
    aboutUs: (req, res) => {
        res.render("aboutUs.ejs");
    },
    informacionVendedor: (req, res) => {
        res.render("informacionVendedor.ejs");
    }
};