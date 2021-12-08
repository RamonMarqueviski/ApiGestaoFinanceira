const Sequelize = require("sequelize");
const instancia = require("../../../database");

const colunas = {
  numero: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  vencimento: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  nomeTitular: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  cvv: {
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
  tableName: "cartao",
  timestamps: true,
  createdAt: "dataCriacao",
  updatedAt: "dataAtualizacao",
  version: "versao",
};
module.exports = instancia.define("cartao", colunas, opcoes);
