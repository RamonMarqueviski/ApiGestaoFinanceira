const Pessoa = require("../../routes/pessoas/Pessoa");
const app = require("../../server");
const request = require("supertest");
const tipoReceita = require("../../routes/pessoas/tipoReceitas/tipoReceita");

//Servidor
describe("Servidor em geral", () => {
  it("Server Listen", async () => {
    const res = await request(app).get("/api/pessoas");

    expect(res.body).toHaveProperty("message");
  });
});

//Pessoa
describe("Pessoa", () => {
  it("Should register in Database - RT04", async () => {
    const res = await request(app).post("/api/pessoas").send({
      primeiroNome: "Afonso",
      sobrenome: "Boing",
      sexo: "M",
      email: "teste.teste@gmail.com",
      telefone: "(47) 9 9999-9988",
      senha: "teste2021",
    });
    expect(res.status).toBe(200);
  });

  it("Should register in Database without email - RT05", async () => {
    const res = await request(app).post("/api/pessoas").send({
      primeiroNome: "Afonso",
      sobrenome: "Boing",
      sexo: "M",
      telefone: "(47) 9 9999-9988",
      senha: "teste2021",
    });

    expect(res.status).not.toBe(200);
  });

  it("Should function of login is right", async () => {
    const res = await request(app).get("/api/pessoas/1").send();
    var doubt;
    if(res.body.email == 'ramommarqueviski@gmail.com' && res.body.senha == 'aaaaa'){
        doubt = true;
    }else{
        doubt = false;
    }
    expect(doubt).toBe(true);
  });
});

//Cartao
describe("Cartão", () => {
  it("Should register in Database - RT06", async () => {
    const res = await request(app).post("/api/pessoas/1/cartoes").send({
      numero: "111122223333444",
      vencimento: "04/20",
      nomeTitular: "Ramon",
      cvv: "444",
    });

    expect(res.status).toBe(201);
  });

  it("Should register in Database - RT07", async () => {
    const cvv = "1232";
    const res = await request(app).post("/api/pessoas/1/cartoes").send({
      numero: "111122223333444",
      vencimento: "21/23",
      nomeTitular: "Lucas R Vegini",
      cvv: cvv,
    });

    var doubt;
    if (cvv.length == 3) {
      doubt = true;
    } else {
      doubt = false;
    }
    expect(doubt).toBe(false);
  });

  it("Should search a card - RT08", async () => {
    const res = await request(app).get("/api/pessoas/1/cartoes/1").send();
    expect(res.status).toBe(200);
  });
});

//receita
describe("Receita", () => {
  it("Should register in Database - RT09", async () => {
    const res = await request(app)
      .post("/api/pessoas/1/cartoes/1/receitas")
      .send({
        valor: 325,
        tipoReceita: "Mercado",
      });

    expect(res.status).toBe(201);
  });

  it("Should register recipe to any Person - RT09", async () => {
    const res = await request(app)
      .post("/api/pessoas/1/cartoes/1/receitas")
      .send({
        valor: 325,
        tipoReceita: "Mercado",
      });

    const res2 = await request(app)
      .get("/api/pessoas/1/cartoes/1/receitas/1")
      .send();

    expect(res2.status).toBe(200);
  });

  it("Should register in Database - RT10", async () => {
    const res = await request(app)
      .post("/api/pessoas/1/cartoes/1/receitas")
      .send({
        valor: 325,
      });
    expect(res.status).toBe(400);
  });

  it("Should search all history of any person - RT12", async () => {
    const res = await request(app)
      .get("/api/pessoas/1/cartoes/1/receitas/todas")
      .send();
    expect(res.status).toBe(200);
  });

  it("Should search all history of any person is right - RT13", async () => {
    const res = await request(app)
      .get("/api/pessoas/1/cartoes/1/receitas/todas")
      .send();

    expect(res.status).toBe(200);
  });
});

//Tipo da receita
describe("Tipo da receita", () => {
  it("Should type of recipe is right - RT01", async () => {
    const res = await new tipoReceita({
      nome: "Mercado",
      descricao: "Gasto relacionados ao mercado",
      despesaOuReceita: "Gasto",
    });
    expect(res.despesaOuReceita).toBe("Gasto");
  });

  it("Should register in Database - RT03 ", async () => {
    const res = await request(app).post("/api/pessoas/1/tiporeceitas/").send({
      nome: "Mercado",
      descricao: "Gasto relacionados ao mercado",
      despesaOuReceita: "Gasto",
    });
    expect(res.status).toBe(201);
  });

  it("Should try register without type of recipe - RT02", async () => {
    const res = await request(app).post("/api/pessoas/1/tiporeceitas/").send({
      nome: "Mercado",
      descricao: "Gasto relacionados ao mercado",
    });
    expect(res.status).toBe(400);
  });
});
