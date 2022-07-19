const path = require('path');


const { body } = require('express-validator');

const validations = [
    body('productName').notEmpty().withMessage('Escriba un nombre'),
    body('productName').isLength({ min: 5 }).withMessage('minimo 5 caracteres'),
    body('description').notEmpty().isLength({ min: 20 }),
    body('price').notEmpty().withMessage('Escriba el precio del producto').bail()
    .isNumeric().withMessage('Ingrese un numero'),
    body('minBuy').notEmpty().withMessage('Escriba el minimo de compra').bail()
    .isNumeric().withMessage('Ingrese un numero'),
]


module.exports = validations;