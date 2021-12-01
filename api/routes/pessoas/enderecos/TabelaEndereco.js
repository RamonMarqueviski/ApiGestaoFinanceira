const Modelo = require("./ModeloTabelaEndereco");

module.exports = {
  async pegarPorId(idEndereco, idPessoa) {
    const encontrado = await Modelo.findOne({
      where: {
        id: idEndereco,
        pessoa: idPessoa,
      },
    });
    if (!encontrado) {
      throw new Error("Endereço não encontrado");
    }
    return encontrado;
  },
  listar(idPessoa) {
    return Modelo.findAll({
      where: {
        pessoa: idPessoa,
      },
    });
  },
  inserir(dados) {
    return Modelo.create(dados);
  },
  remover(idEndereco, idPessoa) {
    return Modelo.destroy({
      where: {
        pessoa: idPessoa,
        id: idEndereco,
      },
    });
  },
  atualizar(idEndereco, idPessoa, dados) {
    return Modelo.update(dados, {
      where: { id: idEndereco, pessoa: idPessoa },
    });
  },
};
