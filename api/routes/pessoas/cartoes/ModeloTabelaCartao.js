const Sequelize = require("sequelize");
const instancia = require('../../../database');

const colunas = {
    limite:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    bandeira:{
        type: Sequelize.STRING,
        allowNull:false
    },
    banco:{
        type: Sequelize.STRING,
        allowNull:false
    },
    numero:{
        type: Sequelize.STRING,
        allowNull:false
    },
    dataVencimento:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    agencia:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    conta:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    vencimentoFatura:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    pessoa: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: require("../ModeloTabelaPessoa"),
          key: "id",
        }
    }
}

const opcoes = {
    freezeTableName: true,
    tableName: 'cartao',
    timestamps: true,
    createdAt: 'dataCriacao',
    updatedAt: 'dataAtualizacao',
    version: 'versao'
}
module.exports = instancia.define('cartao',colunas,opcoes)