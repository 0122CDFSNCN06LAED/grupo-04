const fs = require("fs");
const { url } = require("inspector");
const path = require("path");
const db = require("../database/models")
const { Op, where } = require("sequelize");
const { validationResult } = require('express-validator')

const controllers = {
    list: (req, res) => {
                if (res.locals.isLogged){
                db.Products.findAll().then(function(products) {
                    db.FavoriteProducs.findAll({where:{user_id:req.session.userLogged.id}}).then(productosFavoritos=>{
                   console.log(productosFavoritos);
                        res.render("products/productsList.ejs", { products, category: null,productosFavoritos })

                    })
        }
        
        ).catch(error => {
            console.log(error)
        })
    }else{ db.Products.findAll().then(function(products) {res.render("products/productsList.ejs", { products, category: null, })})

    }},
    listByCategory: (req, res) => {
        const categoryId = req.params.id;
        if (categoryId) {
            let categoriePedido = db.ProductCategories.findAll({ where: { id: categoryId } });
            let productoPedido = db.Products.findAll({ where: { category_id: categoryId } });
            Promise.all([categoriePedido, productoPedido]).then(function([category, products]) {
                console.log(category)

                if (products.length > 0) {
                    res.render("products/productsList.ejs", { category: category[0], products });

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

    listMyProducts: async(req, res) => {
        const userId = req.session.userLogged.id

        try {
            let productosPedidos = await db.Products.findAll({ where: { vendor_id: userId } });
            // console.log(productosPedidos)
            if (productosPedidos) {
                res.render("products/productsList.ejs", { products: productosPedidos, category: null, productosFavoritos:null })
            } else {
                res.redirect('/')
            }

        } catch (error) {

            res.redirect('/')
        }
    },
   

    create: (req, res) => {
        req.session.userLogged.recentCreatedBrand = null;
        db.Models.findAll({ include: [{ association: "marcas" }] }).then((modelos) => {
            db.ProductCategories.findAll().then((categories) => {
                db.Users.findAll().then((vendor) => {
                    res.render("products/product-create-form", { m: modelos, c: categories, v: vendor })
                })
            })
        })
    },
    store: async(req, res) => {
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            console.log(resultValidation.errors);
            db.Models.findAll().then((modelos) => {
                db.ProductCategories.findAll().then((categories) => {
                    db.Users.findAll().then((vendor) => {
                        res.render("products/product-create-form", {
                            m: modelos,
                            c: categories,
                            v: vendor,
                            errors: resultValidation.mapped(),
                            oldData: req.body
                        })
                    })
                })
            })
        } else {
            const userId = req.session.userLogged.id
            const datosRecibidos = JSON.parse(JSON.stringify(req.body));
            await db.Products.create({
                productName: datosRecibidos.productName,
                price: datosRecibidos.price,
                minBuy: datosRecibidos.minBuy,
                productImages: req.file.filename,
                description: datosRecibidos.description,
                models_id: datosRecibidos.models,
                category_id: datosRecibidos.category,
                vendor_id: userId,
            });
            res.redirect("/")
        }
    },
    edit: (req, res) => {


        try {

            let pedidoProducto = db.Products.findByPk(req.params.id);
            let pedidoModelos = db.Models.findAll();
            let pedidoCategorias = db.ProductCategories.findAll();
            Promise.all([pedidoProducto, pedidoModelos, pedidoCategorias])
                .then(([producto, modelos, categorias]) => {
                    const userId = req.session.userLogged.id
                    if (producto != null && userId == producto.vendor_id) {
                        res.render("products/product-edit-form", { p: producto, m: modelos, c: categorias })
                    } else {
                        res.redirect("../../products/myProducts")
                    };

                })
        } catch (error) {
            res.redirect("../../products/myProducts")
        }
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
            // console.log(datosRecibidos);
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
    productosFavoritos: (req,res)=>{
        db.FavoriteProducs.create({
            product_id:req.params.id,
            user_id:req.session.userLogged.id
        }).then((favoritoNuevo)=>{
res.redirect("/")
        }).catch(error=>{
            console.log(error)
        })
    },
    listFavoritesProducts: async(req, res) => {
        const userId = req.session.userLogged.id
        let productos =  await db.Products.findAll();
        let productosFavoritos = await db.FavoriteProducs.findAll({where:{user_id: userId}});
        let favoriteIDproduct =  productosFavoritos
        console.log(favoriteIDproduct)
        if(productosFavoritos){
            res.render('products/productsList.ejs',{ category:null, products:productosFavoritos })
        }else{
            res.send('no tienes productos favoritos')
        }
    },
    add: (req, res) => {
        /* db.ProductCart.create({
         })*/
        res.send("agregaste al carrito")
    },

    apiProduct: (req, res) => {
        db.Products.findAll()
            .then(productos => {
                let lista = [];
                for (unProducto of productos) {
                    let unProd = {
                        nombre: unProducto.productName,
                        descripcion: unProducto.description,
                        precio: unProducto.price,
                        minBuy: unProducto.minBuy,
                       
                    };
                    lista.push(unProd);

                }
                res.status(200).json({
                    registro: lista.length,
                    data: lista,
                    codigo: 200,
                })

            });
    },
    apiProductDetail: (req, res) => {
        db.Products.findByPk(req.params.id, { include: [{ association: "categories" },{association:"productosFavoritos"}] })
            .then(producto => {
                res.status(200).json({
                    nombre: producto.productName,
                    descripcion: producto.description,
                    precio: producto.price,
                    minBuy: producto.minBuy,
                    imagen:`http://localhost:3001/img/articulos/${producto.productImages}`,
                    favoritos: producto.productosFavoritos,
                    categoria: producto.categories.name,
                    codigo: 200,
                })
            });
    },
    apiCategories: (req, res) => {
        console.log("category");
        db.Products.findAll().then(products=>{
            db.ProductCategories.findAll()
            .then(category => {
                let categorias = []
                
                category.forEach(element => {
                    let categoria = {
                        nombre: element.name,
                        cantidad:products.filter(x=>x.category_id==element.id).length,
                    }
                    categorias.push(categoria)
                });
                return res.status(200).json({
                    registro: categorias.length,
                    data: categorias,
                    codigo: 200
                })
            }).catch(excepcion => {
                console.log(excepcion);
            })
        }).catch(excepcion => {
            console.log(excepcion)});
       
    },
}



module.exports = controllers