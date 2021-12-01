const roteador = require("express").Router({ mergeParams: true });
const TabelaCartao = require("./TabelaCartao");
const Cartao = require("../cartoes/Cartao");

roteador.get("/", async (req, res) => {
  const cartoes = await TabelaCartao.listar(req.params.idPessoa);
  res.send(JSON.stringify(cartoes));
});
roteador.get("/:idCartao", async (req, res) => {
  try {
    const idCartao = req.params.idCartao;
    const idPessoa = req.params.idPessoa;
    console.log(idCartao);
    const cartao = new Cartao({
      id: idCartao,
      pessoa: idPessoa,
    });
    await cartao.carregar();
    res.send(JSON.stringify(cartao));
  } catch (erro) {
    res.send(
      JSON.stringify({
        mensagem: erro.message,
      })
    );
  }
});

roteador.post("/", async (req, res) => {
  try {
    const idPessoa = req.params.idPessoa;
    const dadosRecebidos = req.body;
    const dados = Object.assign({}, dadosRecebidos, { pessoa: idPessoa });
    const cartao = new Cartao(dados);
    console.log(cartao);
    await cartao.criar();
    res.status(201).send(JSON.stringify(cartao));
  } catch (erro) {
    res.status(400).send(
      JSON.stringify({
        mensagem: erro.message,
      })
    );
  }
});

roteador.put("/:idCartao", async (req, res) => {
  try {
    const idCartao = req.params.idCartao;
    const idPessoa = req.params.idPessoa;
    const dadosRecebidos = req.body;
    const dados = Object.assign({}, dadosRecebidos, {
      id: idCartao,
      pessoa: idPessoa,
    });
    const cartao = new Cartao(dados);
    await cartao.atualizar();
    res.status(202).end();
  } catch (erro) {
    res.status(400).send(
      JSON.stringify({
        mensagem: erro.message,
      })
    );
  }
});

roteador.delete("/:idCartao", async (req, res) => {
  try {
    const idPessoa = req.params.idPessoa;
    const dados = {
      id: req.params.idCartao,
      pessoa: req.params.idPessoa,
    };
    const cartao = new Cartao(dados);
    await cartao.remover();
    res.status(204).end();
  } catch (error) {
    res.status(400).send(
      JSON.stringify({
        mensagem: error.message,
      })
    );
  }
});

const roteadorReceitas = require('../cartoes/receitas');
roteador.use('/:idCartao/receitas', roteadorReceitas);

module.exports = roteador;
