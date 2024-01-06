const { DataTypes } = require('sequelize');
const conne = require('../db/connection');

const UserModel = conne.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    }
})

module.exports = { UserModel }