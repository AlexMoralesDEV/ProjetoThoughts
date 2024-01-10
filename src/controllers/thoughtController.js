const { Thought } = require('../models/Thought');

exports.listar = (req, res) => {
    res.render('index');
}

exports.dashboard = (req, res) => {
    res.render('thoughts/dashboard');
}

exports.createThought = (req, res) => {
    res.render('thoughts/create');
}

exports.create = async (req, res) => {
    try {
        const thought = new Thought(req.body);
        await thought.criar()

        if (thought.errors.length > 0) {
            req.flash('errors', thought.errors);
            req.session.save(() => {
                res.redirect('back');
            })
            return;
        }

        req.flash('success', 'Pensamento adicionado com sucesso!');
        req.session.save(() => {
            res.redirect('/');
        });
    }catch(err){
        console.log(err);
    }
}