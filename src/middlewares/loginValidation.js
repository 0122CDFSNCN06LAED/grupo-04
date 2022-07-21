const { body } = require('express-validator');


const validations = [
    body('email').notEmpty().withMessage('Escriba un nombre').bail()
    .isLength({ min: 5 }).withMessage('minimo 5 caracteres'),
    body('password').notEmpty().withMessage('').bail()
    .isLength({ min: 20 }).withMessage('minimo 20 caracteres'),

    body('email').custom((value, { req }) => {
        let file = req.body.name;
        let acceptedExtensions = ['.jpg', '.png', '.jpeg', 'gif'];
        if (!file) {
            throw new Error('Suba una imagen');
        } else {
            let fileExtensions = path.extname(file.originalname);
            if (acceptedExtensions.includes(fileExtensions) === false) {
                throw new Error('Los archivos permitidos son ' + acceptedExtensions.join(', '))
            }
        };
        return true;
    }),
]

module.exports = validations;