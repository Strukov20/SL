import { LoginPageHelper } from "./LoginPageHelper";

beforeEach(function () {
    cy.intercept({
        method: 'GET',
        url: LoginPageHelper.apiAuthGetCompanies,
        }).as('apiGetCompaniesForUser');
    
    cy.intercept({
        method: 'POST',
        url: LoginPageHelper.apiAuthSignIn,
        }).as('apiSignin');

    cy.intercept({
        method: 'POST',
        url: '/api/Auth/forgot-password',
        }).as('apiForgotPassword');

});

describe('Login page tests', function () {
    it.only('C117837: Login with wrong email', function() {

        LoginPageHelper.loginNegative('wrong_email', 'wrong_password');

        cy.wait('@apiGetCompaniesForUser')
            .its('response.statusCode')
            .should('equal', 400);

        cy.get(LoginPageHelper.overlayMessageErrorSelector)
            .contains('We do not recognize that e-mail. Could you try another one?');
    });

    it('C117837: Login with wrong password', function() {

        LoginPageHelper.loginNegative(LoginPageHelper.loginCredentials, 'wrong_password');

        cy.wait('@apiGetCompaniesForUser')
            .its('response.statusCode')
            .should('equal', 200);

        cy.wait('@apiSignin')
            .its('response.statusCode')
            .should('equal', 400);

        cy.get(LoginPageHelper.overlayMessageErrorSelector)
            .contains('Email or password is incorrect!');
    });

    it('C125219: Login with empty form fields', function () {

        LoginPageHelper.loginBlank();

        cy.get(LoginPageHelper.usernameFormErrorSelector)
            .contains('is required');

        cy.get(LoginPageHelper.passwordFormErrorSelector)
            .contains('Password must be at least 6 characters');
    });

    it('C116748: Login with Valid Credentials', function () {

        LoginPageHelper.login();
        
        cy.url()
            .should('contain', '/dashboard');
    });

    it('C116753: Forgot password', function () {

        cy.visit('');

        cy.get(LoginPageHelper.forgotThePasswordButtonSelector)
            .click();
        
        cy.get(LoginPageHelper.resetPasswordFormSelector)
            .type('JohnnySilverhand@mailinator.com');
        
        cy.get(LoginPageHelper.sendButtonSelector)
            .click();

        cy.wait('@apiGetCompaniesForUser')
            .its('response.statusCode')
            .should('equal', 200);
        cy.wait('@apiForgotPassword')
            .its('response.statusCode')
            .should('equal', 200);

        cy.get(LoginPageHelper.resetPasswordMessageSelector)
            .contains('We sent you instructions for resetting your password. Please check your email');

        cy.get(LoginPageHelper.resetPasswordOkButtonSelector)
            .click();

        cy.get(LoginPageHelper.modalOverlaySelector)
            .should('have.length', 1);
    });

    it('C125220: Logout', function () {
        
        LoginPageHelper.login();

        LoginPageHelper.logout();
    });

    it('Checking for elements in LoginPage', function () {
        
        cy.visit('');

        cy.get(LoginPageHelper.shiftlabImageSelector);

        cy.get(LoginPageHelper.chatHelpButtonSelector)
            .click();
    });
});
