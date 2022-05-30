 const users = require('../models/user')

function usuarioLogeado(req, res, next) {


    res.locals.isLogged = false;
    let emailEnCookie = req.cookies.userEmail
    let userEnCookie = users.findByField('email', emailEnCookie)

    if(userEnCookie){
        req.session.userLogged = userEnCookie
    }

    if (req.session.userLogged) {
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
    }
    
    next();

}

module.exports = usuarioLogeado;