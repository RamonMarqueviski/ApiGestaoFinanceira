const Modelo = require("./ModeloTabelaReceita");

module.exports = {
  async pegarPorId(idReceita, idPessoa, idCartao) {
    const encontrado = await Modelo.findOne({
      where: {
        id: idReceita,
        pessoa: idPessoa,
        cartao: idCartao,
      },
    });
    if (!encontrado) {
      throw new Error("Receita não encontrada");
    }
    return encontrado;
  },
  listar(idPessoa, idCartao) {
    return Modelo.findAll({
      where: {
        pessoa: idPessoa,
        cartao: idCartao,
      },
    });
  },
  inserir(dados) {
    return Modelo.create(dados);
  },
  atualizar(idReceita, idPessoa, idCartao, dados) {
    return Modelo.update(dados, {
      where: { id: idReceita, pessoa: idPessoa, cartao: idCartao },
    });
  },
  remover(idReceita, idPessoa, idCartao) {
    return Modelo.destroy({
      where: {
        pessoa: idPessoa,
        id: idReceita,
        cartao: idCartao
      },
    });
  },
};
