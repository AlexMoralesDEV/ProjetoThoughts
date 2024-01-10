const { DataTypes } = require('sequelize');
const conne = require('../db/connection');
const { UserModel } = require('./User');


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

}

UserModel.hasMany(ThoughtModel);
ThoughtModel.belongsTo(UserModel);

module.exports = { ThoughtModel, Thought };