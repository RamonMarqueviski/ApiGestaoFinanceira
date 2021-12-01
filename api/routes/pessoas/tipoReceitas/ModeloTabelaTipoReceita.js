const Sequelize = require("sequelize");
const instancia = require("../../../database");

const colunas = {
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  descricao: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  despesaOuReceita: {
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
  tableName: "tiporeceita",
  timestamps: true,
  createdAt: "dataCriacao",
  updatedAt: "dataAtualizacao",
  version: "versao",
};
module.exports = instancia.define("tiporeceita", colunas, opcoes);
