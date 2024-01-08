const { Sequelize } = require('sequelize');
const conne = new Sequelize('thoughts', 'root', '.anchorCabecalhoHTML5!', {
    host: 'localhost',
    dialect: 'mysql'
})

conne.authenticate()
.then(() => {console.log('Conectado com Sucesso!');})
.catch((err) => {
    console.log(err)
    
})

module.exports = conne;