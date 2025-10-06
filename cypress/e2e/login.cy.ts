describe('Teste de Login', () => {
  it('Deve permitir login com credenciais válidas', () => {
    cy.visit('http://localhost:4200/login') // sua rota local
    cy.get('input[name="email"]').type('teste@teste.com')
    cy.get('input[name="password"]').type('123456')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/dashboard')
  })
})
