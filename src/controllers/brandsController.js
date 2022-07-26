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
    edit: (req, res) => {},
    update: (req, res) => {},
    destroy: (req, res) => {},
}

module.exports = controllers