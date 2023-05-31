/* eslint-disable no-constant-condition */
class BaseHelper {
    // here some fixtures (static data)
    static loginCredentials = Cypress.env('loginCredentials');
    static passwordCredentials = Cypress.env('passwordCredentials');
    static apiURL = Cypress.env('apiURL');
    static baseUrl = Cypress.config('baseUrl')
    
    // some selector consts
    static loginFieldSelector = 'input[type=text]';
    static passwordFieldSelector = '#current-password';
    static signInButtonSelector = '._AsyncButton';
    static forgotThePasswordButtonSelector = '._Button--Ghost';
    static logoutButtonSelector = '.Header__Flex > :nth-child(4)';

    // static functions and cypress commands
    static login(username = this.loginCredentials, password = this.passwordCredentials) {

            cy.session([username, password], function() {

                cy.visit('');
    
                cy.get(BaseHelper.loginFieldSelector)
                .type(username);
                cy.get(BaseHelper.passwordFieldSelector)
                .type(password);
                cy.get(BaseHelper.signInButtonSelector).click();
    
                cy.intercept({
                    method: 'GET',
                    url: BaseHelper.apiURL + '/api/Auth/get-companies-for-user**',
                }).as('apiGetCompaniesForUser');
                cy.wait('@apiGetCompaniesForUser')
                .its('response.statusCode')
                .should('equal', 200);

                cy.intercept({
                    method: 'POST',
                    url: BaseHelper.apiURL + '/api/Auth/signin',
                }).as('apiSignin');
                cy.wait('@apiSignin')
                    .its('response.statusCode')
                    .should('equal', 200);
            },
            {
                validate() {
                    cy.getCookie('auth')
                        .should('exist');
                }
            });

            cy.visit('');
    }


    static logout() {

        cy.get(BaseHelper.logoutButtonSelector)
            .click();
        cy.visit('settings/scheduling')
            .url()
            .should('not.include', '/settings/scheduling');
    }

    static uploadFile(filePath) {
        cy.get('input[type=file]')
        .selectFile({
            contents: filePath,
        }, { force: true });
    }

    static goToLocationsPage() {
        
        cy.get('.Header__Flex > ._Group')
            .contains('Locations')
            .click();
    }

    // use it when you need to check pagination work (employee or locations pages)
    static modulePaginationCheck() {
        
        cy.get('.Pagination__Page').invoke('text').as('page');
        cy.get('.Pagination__Pages').invoke('text').as('pages');

        cy.get('div.Pagination > button.Pagination__Prev')
            .contains('PREVIOUS')
            .then(($btn) => {
                if('@page' === 1) {
                    cy.wrap($btn).should('be.disabled')
                }
            });

        cy.get('div.Pagination')
            .contains('Page');
        cy.get('div.Pagination')
            .contains('of');

        cy.get('div.Pagination > button.Pagination__Next')
            .contains('NEXT')
            .then(($btn) => {
                if('@page' === '@pages') {
                    cy.wrap($btn).should('be.disabled')
                }
            });
    }

    static goToNextPage() {

        cy.get('.Pagination__Next')
            .click();
    }

    static goToPreviousPage() {

        cy.get('.Pagination__Previous')
            .click();
    }

    static goToFirstPage() {
    
        cy.url()
            .then(
                (url) => { cy.visit(url + '&page=1') }
            );
    }

    static goToLastPage() {

        cy.get('.Pagination__Pages').invoke('text').as('pages')
            .then((pages) => {
                cy.url()
                    .then(
                        (url) => { cy.visit(url + `&page=${pages}`) }
                    );
                }
            );
    }

    static getTodayWithSeconds() {
        let today = new Date();
        const result = today.toLocaleString().replace(',', '');
        return `${result}`
    }
}

export { BaseHelper };
