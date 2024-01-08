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

class Thought{
    constructor(){}
}

UserModel.hasMany(ThoughtModel);
ThoughtModel.belongsTo(UserModel);

module.exports = { ThoughtModel };