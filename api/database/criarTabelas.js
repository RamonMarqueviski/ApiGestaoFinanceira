const Modelos = [
  require("../routes/pessoas/ModeloTabelaPessoa"),
  require("../routes/pessoas/enderecos/ModeloTabelaEndereco"),
  require("../routes/pessoas/cartoes/ModeloTabelaCartao"),
  require("../routes/pessoas/tipoReceitas/ModeloTabelaTipoReceita"),
  require("../routes/pessoas/cartoes/receitas/ModeloTabelaReceita"),
];

async function criarTabelas() {
  for (let i = 0; i < Modelos.length; i++) {
    const modelo = Modelos[i];
    await modelo.sync();
  }
}

criarTabelas();
