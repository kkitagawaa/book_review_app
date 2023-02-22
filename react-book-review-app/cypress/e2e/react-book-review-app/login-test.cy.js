describe('Login test', () => {
    it('is working', () => {
        expect(true).to.equal(true)
    })
    it('login-success', () => {
        cy.visit('/login')

        cy.get('.email-input').type('uu@uu.com')
        cy.get('.password-input').type('kitagawa')
        cy.get('.login-button').click()

    })
    it('login-failure', () => {
        cy.visit('/login')

        cy.get('.email-input').type('dummy')
        cy.get('.password-input').type('abcd')
        cy.get('.login-button').click()

    })
})