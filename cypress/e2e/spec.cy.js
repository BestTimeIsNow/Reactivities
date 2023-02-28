const env = 'verify.okta.com';

describe("Prod Support FR Assignment", () => {
    it("Remove Wade and add Spencer", () => {

        cy.on('uncaught:exception', (e, runnable) => {
          console.log('error', e)
          console.log('runnable', runnable)

          // we can simply return false to avoid failing the test on uncaught error
          // return false
          // but a better strategy is to make sure the error is expected
          if (e.message.includes('Things went bad')) {
            // we expected this error, so let's ignore it
            // and let the test continue
            return false
          }
          // on any other error message the test fails
        })

        cy.visit(env);
        let user = Cypress.env("user");
        cy.get('#okta-signin-username').type(user.userName);
        cy.get('#okta-signin-password').type(user.passWord);
        cy.get('#okta-signin-submit').click()

        cy.wait(20000);
        cy.get('[aria-label="launch app SPP"]').invoke('removeAttr','rel').invoke('attr','target','_self').click()
        // cy.wait(20000);
        // cy.origin('https://spp.verifyglobal.com', { args: {matchCase: false} }, () => {
        //   cy.visit('https://spp.verifyglobal.com/public/SelectEntity.aspx', { matchCase: false });

        // })
    })
})