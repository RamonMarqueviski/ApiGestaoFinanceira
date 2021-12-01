const roteador = require("express").Router({ mergeParams: true });
const Tabela = require("./TabelaReceita");
const Receita = require("../receitas/Receita");

roteador.get("/:idReceita", async (req, res) => {
  try {
    const idReceita = req.params.idReceita;
    const idPessoa = req.params.idPessoa;
    const idCartao = req.params.idCartao;
    const receita = new Receita({
      id: idReceita,
      pessoa: idPessoa,
      cartao: idCartao,
    });
    await receita.carregar();
    res.send(JSON.stringify(receita));
  } catch (erro) {
    res.send(
      JSON.stringify({
        mensagem: erro.message,
      })
    );
  }
});

roteador.get("/", async (req, res) => {
  const receitas = await Tabela.listar(
    req.params.idPessoa,
    req.params.idCartao
  );
  res.send(JSON.stringify(receitas));
});

roteador.post("/", async (req, res) => {
  try {
    const idPessoa = req.params.idPessoa;
    const idCartao = req.params.idCartao;
    const dadosRecebidos = req.body;
    const dados = Object.assign({}, dadosRecebidos, {
      pessoa: idPessoa,
      cartao: idCartao,
    });
    const receita = new Receita(dados);
    console.log(receita);
    await receita.criar();
    res.status(201).send(JSON.stringify(receita));
  } catch (erro) {
    res.status(400).send(
      JSON.stringify({
        mensagem: erro.message,
      })
    );
  }
});
roteador.delete("/:idReceita", async (req, res) => {
  try {
    const idPessoa = req.params.idPessoa;
    const idCartao = req.params.idCartao;
    const idReceita = req.params.idReceita;
    const dados = {
      id: idReceita,
      pessoa: idPessoa,
      cartao: idCartao,
    };

    const receita = new Receita(dados);
    await receita.remover();
    res.status(204).end();
  } catch (error) {
    res.status(400).send(
      JSON.stringify({
        mensagem: error.message,
      })
    );
  }
});

roteador.put("/:idReceita", async (req, res) => {
  try {
    const idReceita = req.params.idReceita;
    const idPessoa = req.params.idPessoa;
    const idCartao = req.params.idCartao;
    const dadosRecebidos = req.body;
    const dados = Object.assign({}, dadosRecebidos, {
      id: idReceita,
      pessoa: idPessoa,
      cartao: idCartao,
    });
    const receita = new Receita(dados);
    console.log(receita);
    await receita.atualizar();
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
