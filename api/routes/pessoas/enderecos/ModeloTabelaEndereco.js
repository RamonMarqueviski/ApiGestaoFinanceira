const Sequelize = require("sequelize");
const instancia = require("../../../database");

const colunas = {
  estado: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  tipoDoLogradouro: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  logradouro: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  bairro: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  cidade: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  numero: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  complemento: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  pessoa: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: require("../ModeloTabelaPessoa"),
      key: "id",
    },
  },
};
const opcoes = {
  freezeTableName: true,
  tableName: "endereco",
  timestamps: true,
  createdAt: "dataCriacao",
  updatedAt: "dataAtualizacao",
  version: "versao",
};
module.exports = instancia.define("endereco", colunas, opcoes);
