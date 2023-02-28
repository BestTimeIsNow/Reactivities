const env = 'verify.okta.com';

describe("Prod Support FR Assignment", () => {
    it("Remove Wade and add Spencer", () => {
        cy.visit(env);
        cy.get('#okta-signin-username').type(Cypress.env(user.userName));
        cy.get('#okta-signin-password').type(Cypress.env(user.passWord));
        cy.get('#okta-signin-submit').click() 
    })
})