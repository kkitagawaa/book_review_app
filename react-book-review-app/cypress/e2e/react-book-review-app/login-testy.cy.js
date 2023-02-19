describe('Login test', () => {
    it('is working', () => {
        expect(true).to.equal(true)
    })
    it('login', () => {
        cy.visit('/login')

        cy.get('#input-email').type('dummy@email.com').should('have.attr', 'email')
        cy.get('#input-password').type('abcdefg')
        cy.get('#submit').click()

        cy.get('#result-email').should('have.text', 'dummy@email.com')
        cy.get('#result-role').should('have.text', 'abcdefg')
    })
})