describe('Fluxo de Cadastro/Login', () => {
  const email = `teste_${Date.now()}@teste.com`; // email dinâmico
  const password = '123456';
  const baseUrl = 'http://localhost:4200'; // URL completa do Angular

  it('Deve logar ou criar conta e acessar jogos', () => {
    // Tenta logar primeiro
    cy.visit(`${baseUrl}/login`);

    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();

    // Verifica se logou
    cy.url().then(url => {
      if (!url.includes('/jogos')) {
        // login falhou → fazer cadastro
        cy.visit(`${baseUrl}/register`);

        cy.get('input[name="email"]').type(email);
        cy.get('input[name="password"]').type(password);
        cy.get('input[name="confirmPassword"]').type(password);
        cy.get('button[type="submit"]').click();

        // Verifica se foi redirecionado para /jogos
        cy.url().should('include', '/jogos');
      } else {
        // login deu certo
        cy.url().should('include', '/jogos');
      }
    });
  });
});
