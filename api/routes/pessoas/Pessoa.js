const TabelaPessoa = require("./TabelaPessoa");

class Pessoa {
  constructor({
    id,
    primeiroNome,
    sobrenome,
    sexo,
    email,
    telefone,
    dataCriacao,
    dataAtualizacao,
    versao,
    senha,
  }) {
    this.id = id;
    this.primeiroNome = primeiroNome;
    this.sobrenome = sobrenome;
    this.sexo = sexo;
    this.email = email;
    this.telefone = telefone;
    this.senha = senha;
    this.dataAtualizacao = dataAtualizacao;
    this.dataCriacao = dataCriacao;
    this.versao = versao;
  }
  async criar() {
    this.validar();
    const resultado = await TabelaPessoa.inserir({
      primeiroNome: this.primeiroNome,
      sobrenome: this.sobrenome,
      sexo: this.sexo,
      email: this.email,
      telefone: this.telefone,
      senha: this.senha,
    });
    this.id = resultado.id;
    this.dataCriacao = resultado.dataCriacao;
    this.dataAtualizacao = resultado.dataAtualizacao;
    this.versao = resultado.versao;
  }
  async carregar() {
    if (this.id == null) {
      const PessoaEncontrado = await TabelaPessoa.pegarPorEmail(this.email);
      this.primeiroNome = PessoaEncontrado.primeiroNome;
      this.sobrenome = PessoaEncontrado.sobrenome;
      this.sexo = PessoaEncontrado.sexo;
      this.id = PessoaEncontrado.id;
      this.telefone = PessoaEncontrado.telefone;
      this.senha = PessoaEncontrado.senha;
      this.dataAtualizacao = PessoaEncontrado.dataAtualizacao;
      this.dataCriacao = PessoaEncontrado.dataCriacao;
      this.versao = PessoaEncontrado.versao;
    } else {
      const PessoaEncontrado = await TabelaPessoa.pegarPorId(this.id);
      this.primeiroNome = PessoaEncontrado.primeiroNome;
      this.sobrenome = PessoaEncontrado.sobrenome;
      this.sexo = PessoaEncontrado.sexo;
      this.email = PessoaEncontrado.email;
      this.telefone = PessoaEncontrado.telefone;
      this.senha = PessoaEncontrado.senha;
      this.dataAtualizacao = PessoaEncontrado.dataAtualizacao;
      this.dataCriacao = PessoaEncontrado.dataCriacao;
      this.versao = PessoaEncontrado.versao;
    }
  }
  async atualizar() {
    await TabelaPessoa.pegarPorId(this.id);
    const campos = [
      "primeiroNome",
      "sobrenome",
      "sexo",
      "email",
      "telefone",
      "senha",
    ];
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
    await TabelaPessoa.atualizar(this.id, dadosParaAtualizar);
  }

  async remover() {
    await TabelaPessoa.pegarPorId(this.id);
    return TabelaPessoa.remover(this.id);
  }
  validar() {
    const campos = ["primeiroNome", "sobrenome", "sexo", "email", "telefone"];
    campos.forEach((campo) => {
      const valor = this[campo];
      if (typeof valor != "string" || valor.length == 0) {
        throw new Error(`O campo ${campo} está inválido`);
      }
    });
  }
}

module.exports = Pessoa;
