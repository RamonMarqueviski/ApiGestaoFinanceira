const TabelaEndereco = require("./TabelaEndereco");

class Endereco {
  constructor({
    id,
    estado,
    tipoDoLogradouro,
    logradouro,
    bairro,
    cidade,
    numero,
    complemento,
    dataCriacao,
    dataAtualizacao,
    versao,
    pessoa,
  }) {
    this.id = id;
    this.estado = estado;
    this.tipoDoLogradouro = tipoDoLogradouro;
    this.logradouro = logradouro;
    this.bairro = bairro;
    this.cidade = cidade;
    this.numero = numero;
    this.complemento = complemento;
    this.dataCriacao = dataCriacao;
    this.dataAtualizacao = dataAtualizacao;
    this.versao = versao;
    this.pessoa = pessoa;
  }

  validar() {
    const campos = [
      "estado",
      "tipoDoLogradouro",
      "logradouro",
      "bairro",
      "cidade",
      "numero",
      "complemento",
    ];
    campos.forEach((campo) => {
      const valor = this[campo];
      if (campo != "numero") {
        if (typeof valor != "string" || valor.length == 0) {
          throw new Error(`O campo ${campo} está inválido`);
        }
      } else {
        if (typeof valor != "number" || valor < 0) {
          throw new Error(`O campo ${campo} está inválido`);
        }
      }
    });
  }
  async criar() {
    this.validar();
    const resultado = await TabelaEndereco.inserir({
      estado: this.estado,
      tipoDoLogradouro: this.tipoDoLogradouro,
      logradouro: this.logradouro,
      bairro: this.bairro,
      cidade: this.cidade,
      numero: this.numero,
      complemento: this.complemento,
      pessoa: this.pessoa,
    });
    this.id = resultado.id;
    this.dataCriacao = resultado.dataCriacao;
    this.dataAtualizacao = resultado.dataAtualizacao;
    this.versao = resultado.versao;
  }

  async remover() {
    await TabelaEndereco.pegarPorId(this.id, this.pessoa);
    return await TabelaEndereco.remover(this.id, this.pessoa);
  }
  async carregar() {
    const EndereroEncontrado = await TabelaEndereco.pegarPorId(
      this.id,
      this.pessoa
    );
    this.estado = EndereroEncontrado.estado;
    this.tipoDoLogradouro = EndereroEncontrado.tipoDoLogradouro;
    this.logradouro = EndereroEncontrado.logradouro;
    this.bairro = EndereroEncontrado.bairro;
    this.cidade = EndereroEncontrado.cidade;
    this.numero = EndereroEncontrado.numero;
    this.complemento = EndereroEncontrado.complemento;
    this.dataCriacao = EndereroEncontrado.dataCriacao;
    this.dataAtualizacao = EndereroEncontrado.dataAtualizacao;
    this.versao = EndereroEncontrado.versao;
  }
  async atualizar() {
    await TabelaEndereco.pegarPorId(this.id, this.pessoa);
    const campos = [
      "estado",
      "tipoDoLogradouro",
      "logradouro",
      "bairro",
      "cidade",
      "numero",
      "complemento",
    ];
    const dadosParaAtualizar = {};

    campos.forEach((campo) => {
      const valor = this[campo];
      if (campo != "numero") {
        if (typeof valor === "string" && valor.length > 0) {
          dadosParaAtualizar[campo] = valor;
        }
      }else{
        if (typeof valor === "number" && valor > 0) {
          dadosParaAtualizar[campo] = valor;
        }
      }
    });
    if (Object.keys(dadosParaAtualizar).length === 0) {
      throw new Error("Dados insuficientes para atualizar");
    }
    await TabelaEndereco.atualizar(this.id,this.pessoa, dadosParaAtualizar);
  }
}
module.exports = Endereco;
