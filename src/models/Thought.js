const { DataTypes } = require('sequelize');
const conne = require('../db/connection');
const { UserModel } = require('./User')

const ThoughtModel = conne.define('Thought', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    }
})

ThoughtModel.belongsTo(UserModel);
UserModel.hasMany(ThoughtModel);

module.exports = { ThoughtModel }