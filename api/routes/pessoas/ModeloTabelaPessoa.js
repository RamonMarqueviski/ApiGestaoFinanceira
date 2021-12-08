const Sequelize = require("sequelize");
const instancia = require('../../database');

const colunas = {
    primeiroNome: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    sobrenome: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    sexo: {
      type: Sequelize.ENUM('M','F'),
      allowNull: false,
    },
    telefone:{
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    senha:{
      type: Sequelize.STRING,
      allowNull: false,
    }
  };
  const opcoes = {
      freezeTableName: true,
      tableName: 'pessoa',
      timestamps: true,
      createdAt: 'dataCriacao',
      updatedAt: 'dataAtualizacao',
      version: 'versao'
  }
  
  module.exports = instancia.define('pessoa',colunas,opcoes)