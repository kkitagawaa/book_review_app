describe('Sample test', () => {
    it('check data', () => {
        cy.visit('test_cypress.html')  // 今回はファイルの相対パス

        cy.get('#input-email').type('dummy@email.com')  // 適当なメールアドレスを渡す
        cy.get('#select-role').select('管理者') //権限の選択
        cy.get('#submit').click()  // 登録ボタンを押す
        cy.get('#result-email').should('have.text', 'dummy@email.com')  // 以下、出力のチェック
        cy.get('#result-role').should('have.text', '管理者')
    })
})