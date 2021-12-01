const Sequelize = require("sequelize");
const instancia = require("../../../../database");

const colunas = {
  valor: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  descricao: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  dataTransacao: {
    type: Sequelize.DATEONLY,
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
  tipoReceita: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: require("../../tipoReceitas/ModeloTabelaTipoReceita"),
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
