const TabelaCartao = require("./TabelaCartao");

class Cartao {
  constructor({
    id,
    limite,
    bandeira,
    banco,
    numero,
    dataVencimento,
    agencia,
    conta,
    vencimentoFatura,
    dataCriacao,
    dataAtualizacao,
    versao,
    pessoa,
  }) {
    this.id = id;
    this.limite = limite;
    this.bandeira = bandeira;
    this.banco = banco;
    this.numero = numero;
    this.dataVencimento = dataVencimento;
    this.agencia = agencia;
    this.conta = conta;
    this.vencimentoFatura = vencimentoFatura;
    this.pessoa = pessoa;
    this.dataCriacao = dataCriacao;
    this.dataAtualizacao = dataAtualizacao;
    this.versao = versao;
  }
  validar() {
    const campos = [
      "limite",
      "bandeira",
      "banco",
      "numero",
      "dataVencimento",
      "agencia",
      "conta",
      "vencimentoFatura",
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
    this.limite = cartaoEncontrado.limite;
    this.bandeira = cartaoEncontrado.bandeira;
    this.banco = cartaoEncontrado.banco;
    this.numero = cartaoEncontrado.numero;
    this.dataVencimento = cartaoEncontrado.dataVencimento;
    this.agencia = cartaoEncontrado.agencia;
    this.conta = cartaoEncontrado.conta;
    this.vencimentoFatura = cartaoEncontrado.vencimentoFatura;
  }
  async criar() {
    this.validar();
    const resultado = await TabelaCartao.inserir({
      limite: this.limite,
      bandeira: this.bandeira,
      banco: this.banco,
      numero: this.banco,
      dataVencimento: this.dataVencimento,
      agencia: this.agencia,
      conta: this.conta,
      vencimentoFatura: this.vencimentoFatura,
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
      "limite",
      "bandeira",
      "banco",
      "numero",
      "dataVencimento",
      "agencia",
      "conta",
      "vencimentoFatura",
    ];
    const dadosParaAtualizar = {};
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
