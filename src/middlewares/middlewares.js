exports.middlewareGlobal = (req, res, next) => {
    if(req.session.userId){
        res.locals.session = req.session;
        console.log(req.session);
    };
    if(req.flash('errors')){
        res.locals.message = req.flash('errors');
        console.log('MIDDLEWARE: ------------------- ' + res.locals.message);
    };
    if(req.flash('success')){
        res.locals.message = req.flash('success');
        console.log('MIDDLEWARE: ------------------- ' + res.locals.message);
    }
    console.log('Passei pelo middleware de session');
    next();
};