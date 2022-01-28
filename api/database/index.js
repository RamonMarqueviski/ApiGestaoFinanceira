const Sequelize = require('sequelize');
const config = require('config');

const instancia = new Sequelize(
    'gestaofinanceira',
    'root',
    'admin',
    {
        host: '127.0.0.1',
        dialect: 'mysql'
    }


)

module.exports = instancia;