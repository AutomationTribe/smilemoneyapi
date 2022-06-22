// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('authenticate', (userName, password) => {
    cy.request({
        method:'POST', 
        url:'https://smilemoney-sandbox.renmoney.com/agent/login',
        body: {
            "email": "wolerevo34@tmail.com",
            "password": "password",
            "networkKey": "4342424"
        }
      })
      .then((response) => {
        Cypress.env('token', response.body.accessToken); // either this or some global var but remember that this will only work in one test case
        return response.body.data.access_token;
      })
    
  })
