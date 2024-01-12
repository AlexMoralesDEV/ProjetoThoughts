exports.middlewareGlobal = (req, res, next) => {
    if (req.session.userId) {
        res.locals.session = req.session;
        console.log(req.session);
    };
    
    res.locals.errors = req.flash('errors');
    res.locals.success = req.flash('success');
    res.locals.key = process.env.FONTAWESOMECODE;

    console.log('Passei pelo middleware de session');
    next();
};

exports.userExists = (req, res, next) => {
    if (!res.locals.session) {
        req.flash('errors', 'Faça login para ter acesso à essa página!');
        req.session.save(() => {
            res.redirect('/');
        })
        return;
    }
    
    next();
}