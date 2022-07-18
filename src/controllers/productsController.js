const fs = require("fs");
const { url } = require("inspector");
const path = require("path");
const db = require("../database/models")
const productsFilePath = path.join(__dirname, "../data/products.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
const { Op } = require("sequelize");
const { validationResult } = require('express-validator')


const usersFilePath = path.join(__dirname, "../data/users.json");
const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

const controllers = {
    list: (req, res) => {
        db.Products.findAll(

        ).then(function(products) {
            res.render("products/productsList.ejs", { products })
        }).catch(error => {
            console.log(error)
        })


    },

    create: (req, res) => {
        db.Models.findAll().then((modelos) => {
            db.ProductCategories.findAll().then((categories) => {
                res.render("products/product-create-form", { m: modelos, c: categories })
            })

        })

    },
    store: async(req, res) => {
        const datosRecibidos = JSON.parse(JSON.stringify(req.body));
        await db.Products.create({

            productName: datosRecibidos.productName,
            price: datosRecibidos.price,
            minBuy: datosRecibidos.minBuy,
            productImages: req.file.filename,
            description: datosRecibidos.description,
            models_id: datosRecibidos.models,
            category_id: datosRecibidos.category


        });

        res.redirect("/")

    },

    edit: (req, res) => {
        let pedidoProducto = db.Products.findByPk(req.params.id);
        let pedidoModelos = db.Models.findAll();
        let pedidoCategorias = db.ProductCategories.findAll();
        Promise.all([pedidoProducto, pedidoModelos, pedidoCategorias])
            .then(([producto, modelos, categorias]) => {
                res.render("products/product-edit-form", { p: producto, m: modelos, c: categorias })
            })

    },

    update: (req, res) => {
        const datosRecibidos = JSON.parse(JSON.stringify(req.body));
        console.log(datosRecibidos);
        db.Products.findByPk(req.params.id).then((producto) => {
            producto.productName = datosRecibidos.productName;
            producto.price = datosRecibidos.price;
            producto.minBuy = datosRecibidos.minBuy;
            producto.productImages = req.file ? req.file.filename : producto.productImages;
            producto.description = datosRecibidos.description;
            producto.models_id = datosRecibidos.models;
            producto.category_id = datosRecibidos.category
            producto.save().then(() => {
                res.redirect("/products");
            });
        })
    },

    destroy: (req, res) => {

        db.ProductCart.destroy({
            where: {
                product_id: req.params.id
            }
        }).then(() => {
            db.FavoriteProducs.destroy({
                where: {
                    product_id: req.params.id
                }
            }).then(() => {
                db.Products.destroy({
                    where: {
                        id: req.params.id
                    }
                }).then(() => {
                    res.redirect("/products")
                })

            })
        })

    },
    detail: async(req, res) => {
        // producto trae por PK el producto que recibo por params
        let producto = await db.Products.findByPk(req.params.id, { include: [{ association: "vendor" }, { association: "modelosDeProducto" }] });
        // uso el models_id del resutlado de producto para traerme models y usar la asociación con marcas
        let modelo = await db.Models.findByPk(producto.models_id, { include: [{ association: "marcas" }] });
        // uso la asociación de models para extraer la marca
        let marca = modelo.marcas
        res.render("products/productDetail", { p: producto, m: modelo, marca: marca });
    },


    store2: (req, res) => {
        const datosRecibidos = JSON.parse(JSON.stringify(req.body));


        //chequeamos si enviaron imagen o no
        if (req.file) {

            const acumulador = [];

            for (i = 0; i < products.length; i++) {
                acumulador.push(products[i].id);
            };

            const biggerId = Math.max.apply(null, acumulador);
            const idToAssing = biggerId + 1;
            datosRecibidos.id = idToAssing;
            datosRecibidos.image = req.file.filename;

            products.push(datosRecibidos);
            const productsWithNew = JSON.stringify(products);

            fs.writeFileSync(productsFilePath, productsWithNew);

            const urlToRedirect = "detail/" + idToAssing;
            res.redirect(urlToRedirect);

        } else {
            res.render("products/product-create-form");
        }

    },
    search: (req, res) => {
        const busqueda = req.query.search;
        db.Products.findAll({
            where: {
                productName: {
                    [Op.like]: '%' + busqueda + '%'
                }
            }
        }).then((products) => {
            res.render("products/productsList.ejs", { products })
        })

    },
    add: (req, res) => {
        res.send("agregaste al carrito")
    }
}



module.exports = controllers