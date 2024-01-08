exports.listar = (req, res) => {
    res.render('index');
}

exports.dashboard = (req, res) => {
    res.send('Dashboard');
}