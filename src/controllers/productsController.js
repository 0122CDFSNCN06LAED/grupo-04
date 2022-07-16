const fs = require("fs");
const { url } = require("inspector");
const path = require("path");
const db = require("../database/models")
const productsFilePath = path.join(__dirname, "../data/products.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));


const usersFilePath = path.join(__dirname, "../data/users.json");
const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

const controllers = {
    list: (req, res) => {
        db.Products.findAll(

        ).then(function(products) {

            console.log(products);
            res.render("products/productsList.ejs", { products })
        }).catch(error => {
            console.log(error)
        })


    },

    create: (req, res) => {
        db.Models.findAll().then((modelos) => {
            db.ProductSubCategory.findAll().then((categories) => {
                res.render("products/product-create-form", { m: modelos, c: categories })
            })

        })

    },

    edit: (req, res) => {
        db.Products.findAll({
            /* include : [
                { model: db.ProductsSubCategories, as: 'Subcategories' }
            ] */

        }
        
        ).then((products)=>{
            let producto = products.filter(function(x) {
                return x.id == req.params.id
            })
            db.Models.findAll().then((modelos) => {
                db.ProductSubCategory.findAll().then((categories) => {
                    
                    res.render("products/product-edit-form", { p: producto[0], m: modelos, c: categories })
                })
            })
        });
   
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
        db.ProductsSubCategories.destroy({
            where: {
                product_id : req.params.id
            }
        }).then(()=>{
            db.ProProductCartducts.destroy({
                where: {
                    product_id : req.params.id
                }
            }).then(()=>{
                db.FavoriteProducs.destroy({
                    where: {
                        product_id : req.params.id
                    }
                }).then(()=>{
                    db.Products.destroy({
                        where: {
                            product_id : req.params.id
                        }
                    }).then(()=>{
                        res.redirect("/products")
                    })
            
                })     
            })
    
        })

        
        
    },

    detail: (req, res) => {

        const idBuscado = req.params.id;
        const productDetail = products.find(producto => producto.id == idBuscado);
        const vendorID = productDetail.vendor;

        const vendor = users.find(
            (vendor) => vendor.id == vendorID
        );

        res.render("products/productDetail", {
            p: productDetail,
            vendor: vendor,
        });

    },

    store: (req, res) => {
        const datosRecibidos = JSON.parse(JSON.stringify(req.body));
        db.Products.create({

            productName: datosRecibidos.productName,
            price: datosRecibidos.price,
            minBuy: datosRecibidos.minBuy,
            productImages: '',
            models_id: datosRecibidos.models,
            

        }).then((producto) => {
            db.ProductsSubCategories.create({
                product_id: producto.id,
                productSubCategories_id: datosRecibidos.category
            }).then((productCategory) => {
                res.redirect("/")
            })
        })

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
    add: (req, res) => {
        res.send("agregaste al carrito")
    }
}



module.exports = controllers