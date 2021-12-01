const roteador = require("express").Router({ mergeParams: true });
const Tabela = require("./TabelaEndereco");
const Endereco = require("../enderecos/Endereco");

roteador.get("/:idEndereco", async (req, res) => {
  try {
    const idEndereco = req.params.idEndereco;
    const idPessoa = req.params.idPessoa;
    const endereco = new Endereco({ id: idEndereco, pessoa: idPessoa });
    await endereco.carregar();
    res.send(JSON.stringify(endereco));
  } catch (erro) {
    res.send(
      JSON.stringify({
        mensagem: erro.message,
      })
    );
  }
});

roteador.get("/", async (req, res) => {
  const enderecos = await Tabela.listar(req.params.idPessoa);
  res.send(JSON.stringify(enderecos));
});

roteador.post("/", async (req, res) => {
  try {
    const idPessoa = req.params.idPessoa;
    const dadosRecebidos = req.body;
    const dados = Object.assign({}, dadosRecebidos, { pessoa: idPessoa });
    const endereco = new Endereco(dados);
    await endereco.criar();
    res.status(201).send(JSON.stringify(endereco));
  } catch (erro) {
    res.status(400).send(
      JSON.stringify({
        mensagem: erro.message,
      })
    );
  }
});

roteador.delete("/:idEndereco", async (req, res) => {
  try {
    const idPessoa = req.params.idPessoa;
    const dados = {
      id: req.params.idEndereco,
      pessoa: idPessoa,
    };

    const endereco = new Endereco(dados);
    await endereco.remover();
    res.status(204).end();
  } catch (error) {
    res.status(400).send(
      JSON.stringify({
        mensagem: error.message,
      })
    );
  }
});

roteador.put("/:idEndereco", async (req, res) => {
  try {
    const idEndereco = req.params.idEndereco;
    const idPessoa = req.params.idPessoa;
    const dadosRecebidos = req.body;
    const dados = Object.assign({}, dadosRecebidos, {
      id: idEndereco,
      pessoa: idPessoa,
    });
    const endereco = new Endereco(dados);
    await endereco.atualizar();
    res.status(202).end();
  } catch (erro) {
    res.status(400).send(
      JSON.stringify({
        mensagem: erro.message,
      })
    );
  }
});

module.exports = roteador;
