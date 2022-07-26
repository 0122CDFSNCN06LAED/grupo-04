const db = require("../database/models")
const { Op } = require("sequelize");
const { validationResult } = require('express-validator')

const controllers = {
    list: (req, res) => {

        db.Models.findAll({ include: [{ association: "marcas" }] }).then((models) => {
            res.render("models/modelsList", {
                models : models
            })
        })

    },

    create: async (req, res) => {
        const brands = await db.Brands.findAll();
        res.render("models/modelsCreate", { m: brands });
    },

    store: (req, res) => {
        const datosRecibidos = JSON.parse(JSON.stringify(req.body));

        db.Models.create({
            brand_id: datosRecibidos.brand_id,
            name : datosRecibidos.name,
            description: datosRecibidos.description
        }).then(
            res.redirect("../../models/list")
        );

    }
}


module.exports = controllers