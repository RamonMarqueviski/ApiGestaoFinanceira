const TabelaTipoReceita = require("./TabelaTipoReceita");

class TipoReceita {
  constructor({
    id,
    nome,
    descricao,
    despesaOuReceita,
    dataCriacao,
    dataAtualizacao,
    versao,
    pessoa,
  }) {
    this.id = id;
    this.nome = nome;
    this.descricao = descricao;
    this.despesaOuReceita = despesaOuReceita;
    this.dataCriacao = dataCriacao;
    this.dataAtualizacao = dataAtualizacao;
    this.versao = versao;
    this.pessoa = pessoa;
  }
  validar() {
    const campos = ["nome", "despesaOuReceita"];

    campos.forEach((campo) => {
      const valor = this[campo];
      if (campo != "nome" || campo != "despesaOuReceita") {
        if (typeof valor != "string" || valor.length == 0) {
          throw new Error(`O campo ${campo} está inválido!`);
        }
      }
    });
  }
  async carregar() {
    const tipoReceitaEncontrado = await TabelaTipoReceita.pegarPorId(
      this.id,
      this.pessoa
    );
    this.nome = tipoReceitaEncontrado.nome;
    this.descricao = tipoReceitaEncontrado.descricao;
    this.despesaOuReceita = tipoReceitaEncontrado.despesaOuReceita;
    this.dataCriacao = tipoReceitaEncontrado.dataCriacao;
    this.dataAtualizacao = tipoReceitaEncontrado.dataAtualizacao;
    this.versao = tipoReceitaEncontrado.versao;
  }
  async criar() {
    this.validar();
    const resultado = await TabelaTipoReceita.inserir({
      nome: this.nome,
      descricao: this.descricao,
      despesaOuReceita: this.despesaOuReceita,
      pessoa: this.pessoa,
    });
    this.id = resultado.id;
    this.dataCriacao = resultado.dataCriacao;
    this.dataAtualizacao = resultado.dataAtualizacao;
    this.versao = resultado.versao;
  }
  async atualizar() {
    await TabelaTipoReceita.pegarPorId(this.id, this.pessoa);
    const campos = ["nome", "descricao", "despesaOuReceita"];
    const dadosParaAtualizar = {};
    campos.forEach((campo) => {
      const valor = this[campo];
      if (typeof valor === "string" && valor.length > 0) {
        dadosParaAtualizar[campo] = valor;
      }
    });
    if (Object.keys(dadosParaAtualizar).length === 0) {
      throw new Error("Dados insuficientes para atualizar");
    }
    await TabelaTipoReceita.atualizar(this.id, this.pessoa, dadosParaAtualizar);
  }
  async remover(){
    await TabelaTipoReceita.pegarPorId(this.id,this.pessoa);
    return await TabelaTipoReceita.remover(this.id,this.pessoa);
  }
}
module.exports = TipoReceita;
