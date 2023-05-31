import { BaseHelper } from "../../support/BaseHelper.js";
class ProfilePageHelper extends BaseHelper {

    static avatarPath = 'cypress/fixtures/avatar.jpg'


    static openProfilePage() {
        cy.get('.Header__User')
            .click()
            .url()
            .should("contains", "/profile")
    }

    static clickAssignButton(eq) {
            cy.get('.Location__Footer')
            .eq(eq)
            .click()
    }

    static assignUserToLocation(id) {
        cy.get('[type="select"]').eq(0) // Area select
            .select(2)
            .get('[type="select"]').eq(1) // District select
            .select(1)
            .get('[type="select"]').eq(2) // Store select
            .select(id)
            .get('.Location__Footer')
            .contains('SAVE')
            .click()
    }
    
    static unassignUserToLocation() {
        cy.get('.Location__Footer')
            .contains('UNASSIGN')
            .eq(0)
            .click()
            .get('._Dialog__Footer')
            .contains('Ok')
            .click()
    }

    static locationVisibilityAssertion() {
        cy.get('.Location__Type')
        .contains('ASSIGNED LOCATION')
        .should("be.visible")
    }

    static makeLocationAsPrimary() {
        cy.get('[class="_Button _Button--Smaller"]')
            .contains('MAKE PRIMARY')
            .click()
    }

    static unmarkPrimaryAssertion() {
        cy.get('[class="_Button _Button--Warning _Button--Smaller"]')
            .contains('UNMARK PRIMARY')
            .should('contain', 'UNMARK PRIMARY')
    }

    static unmarkLocationAsPrimary() {
        cy.get('[class="_Button _Button--Warning _Button--Smaller"]')
            .contains('UNMARK PRIMARY')
            .click()
    }

    static makePrimaryAssertion() {
        cy.get('[class="_Button _Button--Smaller"]')
            .contains('MAKE PRIMARY')
            .should('contain', 'MAKE PRIMARY')
    }

    static addLocationButtonAssertion() {
        cy.get('.Location__Type')
            .should('contain', 'ADD LOCATION')
    }
}

export { ProfilePageHelper };