import { BaseHelper } from "../../support/BaseHelper.js";
class EmployeePageHelper extends BaseHelper {
    static openEmployeesPage() {
        cy.get('button[class="_Button"]')
            .contains('Employees')
            .click()
        cy.get('.Module__Ellipsis')
            .should('contain', 'Employees')
    }

    static openAddNewEmployeeModal() {
        cy.get('button[class="_Button"]')
        .contains('ADD EMPLOYEE')
        .click()
    }

    static getElementFromSelector(nameOfField, nameOfRole) {
        cy.get(`[name="${nameOfField}"]`)
        .select(nameOfRole)
    }

    static typeValueToInput(inputName, value) {
        cy.get(`[name="${inputName}"]`)
        .type(value)
    }

    static clickAddButton() {
        cy.get('[class="_Modal__Footer"]')
        .find('button[type="button"]')
        .contains('ADD')
        .click()
    }

    static waitResponseFromInviteEndpoint() {
        cy.wait('@addUserToCompany')
        .its('response.statusCode')
        .should('equal', 200);
    }

    static userAddedAssertion() {
        cy.get('._Modal')
        .find('[class="_Modal__Body"]')
        .should('contain.text', 'User was added')
    }

    static closeApproveModal() {
        cy.get('._Modal')
        .find('button[class="_Button"]')
        .contains('OK')
        .click()
    }

    static findUserBySearch(usernameOfUser) {
        cy.get('.Search__Input')
            .type(usernameOfUser)
            .get('.Search__Button')
            .click()
    }

    static openUserPage(nameOfUser) {
        cy.get('._Table__Body')
        .find('a[class="Link"]')
        .contains(nameOfUser)
        .click()
        cy.wait('@openUserPage')
        .its('response.statusCode')
        .should('equal', 200);
    }

    static openEditMode() {
        cy.get('.Module__Controls')
        .find('._Group')
        .find('button[class="_Button"]')
        .contains('EDIT')
        .click()
    }

    static clickDeleteButton() {
        cy.get('button[class="_Button _Button--Danger _Button--Ghost"]')
        .contains('DELETE ACCOUNT')
        .click()
    }

    static approveUserDeletion() {
        cy.get('[class="_Dialog _Dialog--Danger"]')
        .find('button[class="_Button _Button--Success"]')
        .contains('Ok')
        .click()
        cy.wait('@deleteUser')
        .its('response.statusCode')
        .should('equal', 200);
    }

    static selectLocationInput(locationType, name) {
        cy.get('._Form__Label')
        .contains(locationType)
        .parent()
        .find('select')
        .select(name)
    }

}
export { EmployeePageHelper };