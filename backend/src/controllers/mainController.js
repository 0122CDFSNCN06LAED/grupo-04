const path = require("path");
const fs = require("fs");
const db = require("../database/models")

const productsFilePath = path.join(__dirname, "../data/products.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));



module.exports = {
    home: (req, res) => {

        db.Products.findAll(

        ).then(function(products) {

            res.render("index.ejs", { products })
        }).catch(error => {
            console.log(error)
        })
    },
    
    register: (req, res) => {
        res.redirect("users/register");
    },
    productDetail: (req, res) => {
        res.render("productDetail.ejs");
    },

    
    aboutUs: (req, res) => {
        res.render("aboutUs.ejs");
    },
    informacionVendedor: (req, res) => {
        res.render("informacionVendedor.ejs");
    }
};