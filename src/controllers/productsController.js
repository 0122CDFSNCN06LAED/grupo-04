const fs = require("fs");
const { url } = require("inspector");
const path = require("path");
const db = require("../database/models")
const { Op } = require("sequelize");
const { validationResult } = require('express-validator')

const controllers = {
    list: (req, res) => {
        db.Products.findAll().then(function(products) {
            res.render("products/productsList.ejs", { products, categorie: null })
        }).catch(error => {
            console.log(error)
        })
    },
    listByCategory1: (req, res) => {
        const categoryId = req.params.id;
        if (categoryId) {
            db.Products.findAll({ where: { category_id: categoryId } }, { include: [{ association: "categories" }] }).then(function(products) {;
                console.log((products.category_id));
                if (products.length > 0) {
                    res.render("products/productsList.ejs", { products });
                } else {
                    res.redirect("/")
                }
            }).catch(error => {
                console.log(error)
            })
        } else {
            res.redirect("/")
        };
    },

    listByCategory: (req, res) => {
        const categoryId = req.params.id;
        if (categoryId) {
            let categoriePedido = db.ProductCategories.findAll({ where: { id: categoryId } });
            let productoPedido = db.Products.findAll({ where: { category_id: categoryId } });
            Promise.all([categoriePedido, productoPedido]).then(function([categorie, products]) {
                console.log(categorie)

                if (products.length > 0) {
                    res.render("products/productsList.ejs", { categorie: categorie[0], products });

                } else {
                    res.redirect("/")
                }
            }).catch(error => {
                console.log(error)
            })
        } else {
            res.redirect("/")
        };
    },
    create: (req, res) => {
        db.Models.findAll().then((modelos) => {
            db.ProductCategories.findAll().then((categories) => {
                res.render("products/product-create-form", { m: modelos, c: categories })
            })
        })
    },
    store: async(req, res) => {
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            /* console.log(resultValidation.errors);*/
            db.Models.findAll().then((modelos) => {
                db.ProductCategories.findAll().then((categories) => {
                    return res.render("products/product-create-form", {
                        m: modelos,
                        c: categories,
                        errors: resultValidation.mapped(),
                        oldData: req.body
                    })
                })
            })
        } else {
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
        }
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
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            /* console.log(resultValidation.errors);*/
            let pedidoProducto = db.Products.findByPk(req.params.id);
            let pedidoModelos = db.Models.findAll();
            let pedidoCategorias = db.ProductCategories.findAll();
            Promise.all([pedidoProducto, pedidoModelos, pedidoCategorias])
                .then(([producto, modelos, categorias]) => {
                    res.render("products/product-edit-form", {
                        p: producto,
                        m: modelos,
                        c: categorias,
                        errors: resultValidation.mapped(),
                        oldData: req.body
                    })
                })
        } else {
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
        }
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
        let producto = await db.Products.findByPk(req.params.id, { include: [{ association: "vendor" }, { association: "modelosDeProducto" }] });
        let modelo = await db.Models.findByPk(producto.models_id, { include: [{ association: "marcas" }] });
        let marca = modelo.marcas
        res.render("products/productDetail", { p: producto, m: modelo, marca: marca });
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