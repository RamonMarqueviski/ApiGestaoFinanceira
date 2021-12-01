const roteador = require("express").Router({ mergeParams: true });
const Tabela = require("./TabelaTipoReceita");
const TipoReceita = require("../tipoReceitas/tipoReceita");

roteador.get("/", async (req, res) => {
  const tipoReceitas = await Tabela.listar(req.params.idPessoa);
  res.send(JSON.stringify(tipoReceitas));
});
roteador.get("/:idTipoReceita", async (req, res) => {
  try {
    const idTipoReceita = req.params.idTipoReceita;
    const idPessoa = req.params.idPessoa;
    const tipoReceita = new TipoReceita({
      id: idTipoReceita,
      pessoa: idPessoa,
    });
    await tipoReceita.carregar();
    res.send(JSON.stringify(tipoReceita));
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
    const tipoReceita = new TipoReceita(dados);
    await tipoReceita.criar();
    res.status(201).send(JSON.stringify(tipoReceita));
  } catch (erro) {
    res.status(400).send(
      JSON.stringify({
        mensagem: erro.message,
      })
    );
  }
});

roteador.put("/:idTipoReceita", async (req, res) => {
  try {
    const idTipoReceita = req.params.idTipoReceita;
    const idPessoa = req.params.idPessoa;
    const dadosRecebidos = req.body;
    const dados = Object.assign({}, dadosRecebidos, {
      id: idTipoReceita,
      pessoa: idPessoa,
    });
    const tipoReceita = new TipoReceita(dados);
    await tipoReceita.atualizar();
    res.status(202).end();
  } catch (erro) {
    res.status(400).send(
      JSON.stringify({
        mensagem: erro.message,
      })
    );
  }
});

roteador.delete("/:idTipoReceita", async (req, res) => {
  try {
    const idPessoa = req.params.idPessoa;
    const dados = {
      id: req.params.idTipoReceita,
      pessoa: req.params.idPessoa,
    };

    const tipoReceita = new TipoReceita(dados);
    await tipoReceita.remover();
    res.status(204).end();
  } catch (error) {
    res.status(400).send(
      JSON.stringify({
        mensagem: error.message,
      })
    );
  }
});

module.exports = roteador;
