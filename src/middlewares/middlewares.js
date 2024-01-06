module.exports.middlewareGlobal = (req, res, next) => {
    console.log('Passei pelo middleware global!');
    next();
};

exports.userExists = (req, res, next) => {
    if(req.session.userId){
        res.locals.session = req.session;
    }

    next();
}