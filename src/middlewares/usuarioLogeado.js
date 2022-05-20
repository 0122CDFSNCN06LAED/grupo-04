function usuarioLogeado(req, res, next) {


    res.locals.isLogged = false;

    if (req.session.isLogged) {
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.isLogged;
    }
    next();

}

module.exports = usuarioLogeado;