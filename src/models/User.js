const { DataTypes } = require('sequelize');
const conne = require('../db/connection');
const bcrypt = require('bcryptjs');

const UserModel = conne.define('User', {
    name: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false
    },
    senha: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false
    }
});

class User {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    async registrar() {
        try {
            this.validar();
            await this.userExists();
            this.hashPassword();

            if (this.errors.length > 0) return;

            this.user = await UserModel.create(this.body);
        } catch (error) {
            console.log(error);
        }
    }

    async logar() {
        const user = await UserModel.findOne({ where: { email: this.body.email }, raw: true });
        
        if(!user){
            this.errors.push('Usuário não encontrado!');
            return;
        }
        
        const senhasIguais = bcrypt.compareSync(this.body.senha, user.senha);
        
        if(!senhasIguais){
            this.errors.push('Usuário ou senha inválidos!');
            return;
        }

        return user;
    }

    validar() {
        const { name, email, senha, confirmsenha } = this.body;

        if (senha !== confirmsenha) this.errors.push('As senhas não são as mesmas!');
        if (senha.length < 3 || senha.length > 50) this.errors.push('Quantidade inválida de caracteres na senha!');
    }

    async userExists() {
        const user = await UserModel.findOne({ where: { email: this.body.email } });
        if (user) this.errors.push('Usuário com esse email já existe!');
    };

    hashPassword() {
        const salt = bcrypt.genSaltSync(10);
        this.body.senha = bcrypt.hashSync(this.body.senha, salt);
    }

}

module.exports = { UserModel, User };