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
    request.post(
      {
        headers: { "content-type": "application/x-www-form-urlencoded" },
        url: urlBase+'/api/singin',
        body: '{"user_name":"paf","password":"paf123"}',
      },
      function (error, response, body) {
        // precisamos converter o retorno para um objeto json
        var _body = {};
        try {
          _body = JSON.parse(body);
        } catch (e) {
          _body = {};
        }

        // utilizando a funcao expect do chai, vamos verificar se o resultado da chamada foi sucesso (200)
        expect(response.statusCode).to.equal(200);
        expect(_body.should.have.property("token")).to.equal(true);
        console.log(_body);
        done(); // avisamos o test runner que acabamos a validacao e ja pode proseeguir
      }
    );
  });
});

