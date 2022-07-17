 const users = require('../models/user')

function usuarioLogeado(req, res, next) {


    res.locals.isLogged = false;
    let emailEnCookie = req.cookies.userEmail
    let userEnCookie = users.findByField('email', emailEnCookie)

    if(userEnCookie){
        req.session.userLogged = userEnCookie
        console.log("si hay user en cookie: ", userEnCookie)
    }

    if (req.session.userLogged) {
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
        console.log("si NO hay user en cookie: ",userEnCookie)
    }
    
    next();

}

module.exports = usuarioLogeado;