const TabelaReceita = require("./TabelaReceita");

class Receita {
  constructor({
    id,
    valor,
    tipoReceita,
    cartao,
    dataCriacao,
    dataAtualizacao,
    versao,
    pessoa,
  }) {
    this.id = id;
    this.valor = valor;
    this.tipoReceita = tipoReceita;
    this.cartao = cartao;
    this.dataCriacao = dataCriacao;
    this.dataAtualizacao = dataAtualizacao;
    this.versao = versao;
    this.pessoa = pessoa;
  }
  validar() {
    const campos = ["valor", "tipoReceita"];
    campos.forEach((campo) => {
      const valor = this[campo];
      if (campo != "valor") {
        if (typeof valor != "string" || valor.length == 0) {
          throw new Error(`O campo ${campo} está inválida`);
        } else if (typeof valor != "number" && valor > 0) {
          throw new Error(`O campo ${campo} está inválida`);
        }
      }
    });
  }
  async carregar() {
    const ReceitaEncontrada = await TabelaReceita.pegarPorId(
      this.id,
      this.pessoa,
      this.cartao,
    );
    this.valor = ReceitaEncontrada.valor;
    this.tipoReceita = ReceitaEncontrada.tipoReceita;
    this.dataCriacao = ReceitaEncontrada.dataCriacao;
    this.dataAtualizacao = ReceitaEncontrada.dataAtualizacao;
    this.versao = ReceitaEncontrada.versao;
  }
  async criar() {
    this.validar();
    const resultado = await TabelaReceita.inserir({
      valor: this.valor,
      tipoReceita: this.tipoReceita,
      pessoa: this.pessoa,
      cartao: this.cartao,
    });
    this.id = resultado.id;
    this.dataCriacao = resultado.dataCriacao;
    this.dataAtualizacao = resultado.dataAtualizacao;
    this.versao = resultado.versao;
  }
  async atualizar() {
    await TabelaReceita.pegarPorId(this.id, this.pessoa, this.cartao);
    const campos = ["valor","tipoReceita"];
    const dadosParaAtualizar = {};
    campos.forEach((campo) => {
      const valor = this[campo];
      if (campo != "valor") {
        if (typeof valor === "string" && valor.length > 0) {
          dadosParaAtualizar[campo] = valor;
        }
      } else if (typeof valor === "number" && valor > 0) {
        dadosParaAtualizar[campo] = valor;
      }
    });

    if (Object.keys(dadosParaAtualizar).length === 0) {
      throw new Error("Dados insuficientes para atualizar");
    }
    await TabelaReceita.atualizar(this.id, this.pessoa,this.cartao, dadosParaAtualizar);
  }
  async remover(){
      await TabelaReceita.pegarPorId(this.id,this.pessoa,this.cartao)
      return await TabelaReceita.remover(this.id,this.pessoa,this.cartao)
    }
}
module.exports = Receita;
