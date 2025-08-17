/// <reference types="cypress" />

describe('Login', () => {

  const usuario = {
    email: 'fulano@qa.com',
    password: 'teste'
  };

  it('Deve fazer login com sucesso', () => {
    cy.request({
      method: 'POST',
      url: 'login',
      body: usuario
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.message).to.equal('Login realizado com sucesso');
      expect(response.body).to.have.property('authorization');
      expect(response.body.authorization).to.match(/^Bearer\s[\w-]+\.[\w-]+\.[\w-]+$/); // JWT format
    });
  });

  it('Não deve logar com senha incorreta', () => {
    cy.request({
      method: 'POST',
      url: 'login',
      body: {
        email: usuario.email,
        password: 'senhaErrada'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.equal(401);
      expect(response.body.message).to.equal('Email e/ou senha inválidos');
    });
  });

  it('Não deve logar com email inexistente', () => {
    cy.request({
      method: 'POST',
      url: 'login',
      body: {
        email: 'naoexiste@teste.com',
        password: usuario.password
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.equal(401);
      expect(response.body.message).to.equal('Email e/ou senha inválidos');
    });
  });

});