const { User } = require("../models/User");
const { Thought, ThoughtModel } = require('../models/Thought');

exports.listar = async (req, res) => {
    const thoughts = await Thought.procurarTodos();
    console.log(thoughts);
    res.render('index', { thoughts });
}

exports.dashboard = async (req, res) => {
    const userId = req.session.userId;

    const userExists = await User.usuarioExiste(userId);

    if (!userExists) {
        req.flash('errors', 'Usuário não encontrado!');

        req.session.save(() => {
            res.redirect('/');
        })
        return;
    }

    const thoughts = userExists.Thoughts.map((value) => {
        return value.dataValues;
    })

    res.render('thoughts/dashboard', { thoughts });
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
    } catch (err) {
        console.log(err);
    }
}

exports.deleteThought = async (req, res) => {
    try {
        const userId = req.session.userId;
        await Thought.remover(req.body.id, userId);
        req.flash('success', 'Pensamento apagado com sucesso!');
        req.session.save(() => {
            res.redirect('back');
        })
    } catch (error) {
        console.log(error);
    }
}

exports.edit = async (req, res) => {
    try {
        const userId = req.session.userId;
        const thought = await Thought.procurar(req.params.id);  
        
        res.render('thoughts/edit', { thought } );
    } catch (error) {
        console.log(error);
    }
}

exports.editado = async (req, res) => {
    try {
        const thought = new Thought(req.body);
        await thought.editar(req.params.id);

        if (thought.errors.length > 0) {
            req.flash('errors', thought.errors);
            req.session.save(() => {
                res.redirect('back');
            })
            return;
        }

        req.flash('success', 'Pensamento editado com sucesso!');
        req.session.save(() => {
            res.redirect('back')
        })
    } catch (error) {
        console.log(error);
    };

}