const { atualizar } = require("../enderecos/TabelaEndereco");
const Modelo = require("./ModeloTabelaTipoReceita");

module.exports = {
  async pegarPorId(idTipoReceita, idPessoa) {
    const encontrado = await Modelo.findOne({
      where: {
        id: idTipoReceita,
        pessoa: idPessoa,
      },
    });
    if (!encontrado) {
      throw new Error("Receita não encontrado");
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
  inserir(dados){
    return Modelo.create(dados);
  },
  atualizar(idTipoReceita, idPessoa, dados) {
    return Modelo.update(dados, {
      where: { id: idTipoReceita, pessoa: idPessoa },
    });
  },
  remover(idTipoReceita, idPessoa) {
    return Modelo.destroy({
      where: {
        pessoa: idPessoa,
        id: idTipoReceita,
      },
    });
  },
};
