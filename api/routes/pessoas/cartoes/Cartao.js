const TabelaCartao = require("./TabelaCartao");

class Cartao {
  constructor({
    id,
    nomeTitular,
    banco,
    numero,
    vencimento,
    cvv,
    dataCriacao,
    dataAtualizacao,
    versao,
    pessoa,
  }) {
    this.id = id;
    this.nomeTitular = nomeTitular;
    this.numero = numero;
    this.vencimento = vencimento;
    this.cvv = cvv;
    this.pessoa = pessoa;
    this.dataCriacao = dataCriacao;
    this.dataAtualizacao = dataAtualizacao;
    this.versao = versao;
  }
  validar() {
    const campos = [
      "nomeTitular",
      "numero",
      "vencimento",
      "cvv"
    ];
    campos.forEach((campo) => {
      const valor = this[campo];
      if (
        campo != "limite" ||
        campo != "numero" ||
        campo != "agencia" ||
        campo != "conta" ||
        campo != "dataVencimento" ||
        campo != "vencimentoFatura"
      ) {
        if (typeof valor != "string" || valor.length == 0) {
          throw new Error(`O campo ${campo} está inválido`);
        }
      } else {
        if (typeof valor != "number") {
          throw new Error(`O campo ${campo} está inválido`);
        }
        console.log(campo);
      }
    });
  }
  async carregar() {
    const cartaoEncontrado = await TabelaCartao.pegarPorId(
      this.id,
      this.pessoa
    );
    this.numero = cartaoEncontrado.numero;
    this.vencimento = cartaoEncontrado.vencimento;
    this.cvv = cartaoEncontrado.cvv;
  }
  async criar() {
    this.validar();
    const resultado = await TabelaCartao.inserir({
      nomeTitular : this.nomeTitular,
      numero: this.numero,
      vencimento: this.vencimento,
      cvv: this.cvv,
      pessoa: this.pessoa,
    });
    this.id = resultado.id;
    this.dataCriacao = resultado.dataCriacao;
    this.dataAtualizacao = resultado.dataAtualizacao;
    this.versao = resultado.versao;
  }
  async atualizar() {
    await TabelaCartao.pegarPorId(this.id, this.pessoa);
    const campos = [
      "nomeTitular",
      "numero",
      "vencimento",
      "cvv"
    ];
    const dadosParaAtualizar = {};
    campos.forEach((campo) => {
      const valor = this[campo];
      if (
        campo != "nomeTitular" ||
        campo != "numero" ||
        campo != "vencimento" ||
        campo != "cvv"
      ) {
        if (typeof valor === "string" && valor.length > 0) {
          dadosParaAtualizar[campo] = valor;
        }
      } else {
        if (typeof valor === "number" && valor > 0) {
          dadosParaAtualizar[campo] = valor;
        }
      }
    });
    if (Object.keys(dadosParaAtualizar).length === 0) {
      throw new Error("Dados insuficientes para atualizar");
    }
    await TabelaCartao.atualizar(this.id,this.pessoa, dadosParaAtualizar);
  }
  async remover(){
    await TabelaCartao.pegarPorId(this.id,this.pessoa);
    return await TabelaCartao.remover(this.id, this.pessoa);
  }
}

module.exports = Cartao;
