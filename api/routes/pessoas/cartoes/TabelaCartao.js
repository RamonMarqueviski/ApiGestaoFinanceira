const Modelo = require("./ModeloTabelaCartao");

module.exports = {
    listar(idPessoa) {
        return Modelo.findAll({
          where:{
            pessoa:idPessoa
          }
        });
      },
    async pegarPorId(idCartao,idPessoa){
      const encontrado = await Modelo.findOne({
        where:{
          id: idCartao,
          pessoa: idPessoa
        }
      })
      if (!encontrado) {
        throw new Error("Cartão não encontrado");
      }
      return encontrado;
    },
    inserir(dados) {
      return Modelo.create(dados);
    },
    atualizar(idCartao,idPessoa,dados){
      return Modelo.update(dados, {
        where: { id: idCartao, pessoa: idPessoa },
      });
    },
    remover(idCartao, idPessoa) {
      return Modelo.destroy({
        where: {
          pessoa: idPessoa,
          id: idCartao,
        },
      });
    },
}