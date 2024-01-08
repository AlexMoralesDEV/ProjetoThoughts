exports.middlewareGlobal = (req, res, next) => {
    if (req.session.userId) {
        res.locals.session = req.session;
        console.log(req.session);
    };
    res.locals.errors = req.flash('errors');
    res.locals.success = req.flash('success');
    
    console.log('Passei pelo middleware de session');
    next();
};

exports.userExists = (req, res, next) => {
    if (!res.locals.session) {
        res.redirect('/');
        return;
    }
    
    next();
}