const Sequelize = require("sequelize");
const instancia = require("../../../../database");

const colunas = {
  valor: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  tipoReceita:{
    type: Sequelize.STRING,
    allowNull: false,
  },
  cartao: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: require("../ModeloTabelaCartao"),
      key: "id",
    },
  },
  pessoa:{
    type: Sequelize.INTEGER,
    allowNull:false,
    references:{
      model: require('../../ModeloTabelaPessoa'),
      key: "id"
    }
  }
};
const opcoes = {
  freezeTableName: true,
  tableName: "receita",
  timestamps: true,
  createdAt: "dataCriacao",
  updatedAt: "dataAtualizacao",
  version: "versao",
};

module.exports = instancia.define("receita", colunas, opcoes);
