const { User } = require("../models/User");
const { Thought } = require('../models/Thought');

exports.listar = (req, res) => {
    res.render('index');
}

exports.dashboard = async (req, res) => {
    const userId = req.session.userId;

    const userExists = await User.usuarioExiste(userId);

    if(!userExists){
        req.flash('errors', 'Usuário não encontrado!');

        req.session.save(() => {
            res.redirect('/');
        })
        return;
    }

    const thoughts = userExists.Thoughts.map((value) => {
        return value.dataValues;
    })

    res.render('thoughts/dashboard',  { thoughts } );
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
            res.redirect('/thought/dashboard');
        });
    }catch(err){
        console.log(err);
    }
}