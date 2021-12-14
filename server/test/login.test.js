/**
 * Carrega as bibliotecas que vamos utilizar
 * O mocha nao eh carregado aqui, pois ele que executa este arquivo
 */
var should = require("should");
var request = require("request");
var chai = require("chai");
var expect = chai.expect;
var urlBase = "https://d.dibr.cc";

// Criamos nosso primeiro caso de teste e fornecemos uma descricao utilizando describe
describe("Teste Login", function () {
  // a funcao it eh o que vamos testar realmente, neste caso o endpoint /cards, que deve retornar no maximo 100 cartas
  it("Deve retornar token", function (done) {
    var options = {
      uri: urlBase + "/api/singin",
      method: "POST",
      json: {
        user_name: "paf",
        password: "paf123",
      },
    };

    request(options, function (error, response, body) {
      console.log(error);
      console.log(response);
      console.log(body);
      expect(response.statusCode).to.equal(200);
      expect(body.should.have.property("token")).to.equal(true);
    });
  });
});
