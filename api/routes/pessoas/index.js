const roteador = require("express").Router({ mergeParams: true });
const TabelaPessoa = require("./TabelaPessoa");
const Pessoa = require("./Pessoa");
 

roteador.get("/", async (req, res) => {
  const resultados = await TabelaPessoa.listar();
  res.send(JSON.stringify(resultados));
  res.send({message: "Hello World!"});
});

roteador.post("/", async (req, res) => {
  try{
    const dadosRecebidos = req.body;
 
    const pessoa = new Pessoa(dadosRecebidos);
    await pessoa.criar();
    res.send(JSON.stringify(pessoa));
  }catch(erro){
    res.status(400);
    res.send(JSON.stringify({
      message: erro.message
    }))
  }
});

roteador.get("/:idPessoa", async (req, res) => {
  try {
    const id = req.params.idPessoa;
    const pessoa = new Pessoa({ id: id });
    await pessoa.carregar();
    res.send(JSON.stringify(pessoa));
  } catch (erro) {
    res.send(JSON.stringify({ mensagem: erro.message }));
  }
});

roteador.get("/login/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const pessoa = new Pessoa({ email: email });
    await pessoa.carregar();
    res.send(JSON.stringify(pessoa));
  } catch (erro) {
    res.send(JSON.stringify({ mensagem: erro.message }));
  }
});

roteador.put("/:idPessoa", async (req, res) => {
  try {
    const id = req.params.idPessoa;
    const dadosRecebidos = req.body;
    const dados = Object.assign({}, dadosRecebidos, { id: id });
    const pessoa = new Pessoa(dados);
    await pessoa.atualizar();
    res.end();
  } catch (erro) {
    res.send(JSON.stringify({ mensagem: erro.message }));
  }
});

roteador.delete("/:idPessoa", async(req,res)=>{
  try{
    const id = req.params.idPessoa;
    const pessoa = new Pessoa({id:id})
    await pessoa.carregar();
    await pessoa.remover();
    res.end();
  }catch(erro){
    res.send(JSON.stringify({ mensagem: erro.message }));
  }
})

const roteadorCartoes = require('../pessoas/cartoes');
roteador.use('/:idPessoa/cartoes', roteadorCartoes);
const roteadorEnderecos = require('./enderecos');
roteador.use('/:idPessoa/enderecos', roteadorEnderecos);
const roteadorTipoReceita = require('./tipoReceitas');
roteador.use('/:idPessoa/tiporeceitas',roteadorTipoReceita);


module.exports = roteador;
