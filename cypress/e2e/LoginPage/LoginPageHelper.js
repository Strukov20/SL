import { BaseHelper } from '../../support/BaseHelper.js';

export class LoginPageHelper extends BaseHelper {


    static apiAuthGetCompanies = this.apiURL + '/api/Auth/get-companies-for-user**';
    static apiAuthSignIn = this.apiURL + '/api/Auth/signin';

    static modalOverlaySelector = '._Modal__Overlay'
    static overlayMessageErrorSelector = '._Toast__Message';
    static usernameFormErrorSelector = ':nth-child(1) > ._Form__Error';
    static passwordFormErrorSelector = ':nth-child(2) > ._Form__Error';
    static shiftlabImageSelector = 'div ._Modal__Header > img[alt="Shiftlab"]';
    static chatHelpButtonSelector = '.intercom-lightweight-app-launcher-icon-open';
    static forgotPasswordButtonSelector = 'body > div._Modal__Overlay > div > div._Modal__Footer > div > div > button._Button._Button--Ghost';
    static resetPasswordFormSelector = '._Modal__Overlay > div._Modal:not(.Login) > ._Modal__Body > ._Form > ._Form__Field > ._Input > ._TextInput__Wrapper > input';
    static sendButtonSelector = '._Modal__Footer > ._Group > ._AsyncButton';
    static resetPasswordMessageSelector = '._Modal > ._Modal__Body';
    static resetPasswordOkButtonSelector = ':nth-child(1) > ._Modal__Footer > ._Button';

    static loginNegative(username, password) {

        cy.visit('');

        cy.get(BaseHelper.loginFieldSelector)
        .type(username);

        cy.get(BaseHelper.passwordFieldSelector)
        .type(password);

        cy.get(BaseHelper.signInButtonSelector)
        .click();
    };

    static loginBlank() {
        
        cy.visit('');

        cy.get(BaseHelper.loginFieldSelector);

        cy.get(BaseHelper.passwordFieldSelector);

        cy.get(BaseHelper.signInButtonSelector)
        .click();

    };
};
