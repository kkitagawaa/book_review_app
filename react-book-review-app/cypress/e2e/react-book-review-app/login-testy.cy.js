describe('Login test', () => {
    it('is working', () => {
        expect(true).to.equal(true)
    })
    it('login', () => {
        cy.visit('/login')

         cy.get('.email-input').type('dummy@email.com').should("have.length.greaterThan", 0)

    })
})