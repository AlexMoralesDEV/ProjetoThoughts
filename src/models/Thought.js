const { DataTypes } = require('sequelize');
const conne = require('../db/connection');
const { UserModel } = require('./User');
const { Op } = require('sequelize');

const ThoughtModel = conne.define('Thought', {
    title: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false
    }
});

class Thought {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = [];
    }

    async criar() {
        try {
            this.validar();

            if (this.errors.length > 0) return;

            this.user = await ThoughtModel.create(this.body);
        } catch (error) {
            console.log(error);
        }
    }

    validar() {
        if (!this.body.title) this.errors.push('O campo pensamento não pode estar vazio!');
    }

    static async remover(id, userId){
        await ThoughtModel.destroy({ where: { id: id, UserId: userId }})
    }

    static async procurar(id){
        const thought = await ThoughtModel.findOne({ where: { id: id }, raw: true});
        return thought;
    }

    static async procurarTodos(search, order){ 
        const dataThought = await ThoughtModel.findAll({ 
            include: UserModel,
            where: {
                title: {[Op.like]: `%${search}%`}
            },
            order: [['createdAt', order]]
        });

        const thoughts = dataThought.map((valor) =>  valor.get({plain: true}) );

        return thoughts;
    }

    async editar(id){
        this.validar();

        if(this.errors.length > 0) return;

        this.user = await ThoughtModel.update({ 
            title: this.body.title }, {
            where: {
                id: id
            }
        });
    };
}

UserModel.hasMany(ThoughtModel);
ThoughtModel.belongsTo(UserModel);

module.exports = { ThoughtModel, Thought };