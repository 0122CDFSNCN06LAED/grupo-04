const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, "../data/products.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const controllers = {
    index: (req, res) => {
        res.render("productsList.ejs", {
            products
        })
    },

    create: (req, res) => {
        res.render("product-create-form");
    },

    edit: (req, res) => {
        let producto = products.filter(function(x) {
            return x.id == req.params.id
        })


        res.render("product-edit-form", { p: producto[0] });
    },
    update: (req, res) => {

        products.forEach(x => {
            if (x.id == req.params.id) {
                x.name = req.body.name
                x.category = req.body.category
                x.description = req.body.description
                x.vendor = req.body.vendor
                x.price = Number(req.body.price)
                x.stock = Number(req.body.stock)
                x.img = req.body.img
                x.minBuy = Number(req.body.minBuy)
            }

        });
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
        res.redirect("/products");

    },
    destroy: (req, res) => {
        let productosNuevos = products.filter(function(x) {
            return x.id != req.params.id
        })
        fs.writeFileSync(productsFilePath, JSON.stringify(productosNuevos, null, ' '));
        res.redirect("/products")
    }
}

module.exports = controllers