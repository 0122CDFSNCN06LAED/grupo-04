const db = require("../database/models")
const { Op } = require("sequelize");
const { validationResult } = require('express-validator')

const controllers = {
    list: (req, res) => {
        db.Brands.findAll().then( (brands) => 
        res.render("brands/brandsList", {
            brands: brands
        })
    );
    },
    create: (req, res) => {
        res.render("brands/brandsCreate")
    },

    store: (req, res) => {
        const datosRecibidos = JSON.parse(JSON.stringify(req.body));
        db.Brands.create({
            name : datosRecibidos.name
        }).then(
            res.redirect("../../brands/list")
        );

    },
    edit: (req, res) => {

        if (req.session.userLogged.usercategory_id == 1) {
            const paramsId = req.params.id;
            
            if (!paramsId) {
                res.redirect(`/brands/list`)
            } else {
                db.Brands.findByPk(paramsId).then((brand) => {
                    if (brand){
                        res.render("brands/brandsEdit", { b: brand })
                    } else {
                        res.redirect(`/brands/list`)
                    }

                });
            };
        } else {
            res.redirect("/products/");
        }
    },
    update: (req, res) => {

        if (req.session.userLogged.usercategory_id == 1) {
            const paramsId = req.params.id;
            
            if (!paramsId) {
                res.redirect(`/brands/list`)
            } else {
                db.Brands.update({
                    name: req.body.name
                }, {
                    where: { id: paramsId }
                }).then((brand) => {
                    console.log(brand)
                    res.redirect("/brands/list")
                });
            };
        } else {
            res.redirect("/products/");
        }
        

    },
    destroy: (req, res) => {

        if (req.session.userLogged.usercategory_id == 1) {
            const paramsId = req.params.id;
            
            if (!paramsId) {
                res.redirect(`/brands/list`)
            } else {
                db.Brands.destroy({
                    where: {
                        id: req.params.id
                    }
                }).then(() => {
                    res.redirect("/brands/list")
                });
            };
        } else {
            res.redirect("/products/");
        }

    },
}

module.exports = controllers