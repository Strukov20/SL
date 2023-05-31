import { EmployeePageHelper } from "../EmployeePage/EmployeePageHelper"
import employeePageJson from "../../fixtures/EmployeePage/employeePage.json"

beforeEach(function () {
	EmployeePageHelper.login();
    EmployeePageHelper.openEmployeesPage();
});

describe("Profile page tests", () => {

    context("Actions with users", () => {
        it("C116776 Add Global Manager", () => {
            cy.intercept({
                method: 'POST',
                url: 'api/Auth/invite-users-to-company/**',
            }).as('addUserToCompany');
            cy.intercept({
                method: 'GET',
                url: 'api/CompanyUser/**',
            }).as('openUserPage');
            cy.intercept({
                method: 'DELETE',
                url: 'api/CompanyUser/**',
            }).as('deleteUser');
            
            EmployeePageHelper.openAddNewEmployeeModal()
            EmployeePageHelper.getElementFromSelector(employeePageJson.users.globalManager.companyRoleSelector , employeePageJson.users.globalManager.companyRole )
            EmployeePageHelper.typeValueToInput( employeePageJson.users.globalManager.firstNameSelector , employeePageJson.users.globalManager.firstName )
            EmployeePageHelper.typeValueToInput( employeePageJson.users.globalManager.lastNameSelector , employeePageJson.users.globalManager.lastName )
            EmployeePageHelper.typeValueToInput( employeePageJson.users.globalManager.usernameSelector , employeePageJson.users.globalManager.username )
            EmployeePageHelper.typeValueToInput( employeePageJson.users.globalManager.emailSelector , employeePageJson.users.globalManager.email )
            EmployeePageHelper.clickAddButton()
            EmployeePageHelper.waitResponseFromInviteEndpoint()
            EmployeePageHelper.userAddedAssertion()
            EmployeePageHelper.closeApproveModal()
            //delete user
            EmployeePageHelper.findUserBySearch(employeePageJson.users.globalManager.username)
            EmployeePageHelper.openUserPage(employeePageJson.users.globalManager.firstName)
            EmployeePageHelper.openEditMode()
            EmployeePageHelper.clickDeleteButton()
            EmployeePageHelper.approveUserDeletion()
        }),

        it("C116777 Add Area Manager", () => {
            cy.intercept({
                method: 'POST',
                url: 'api/Auth/invite-users-to-company/**',
            }).as('addUserToCompany');
            cy.intercept({
                method: 'GET',
                url: 'api/CompanyUser/**',
            }).as('openUserPage');
            cy.intercept({
                method: 'DELETE',
                url: 'api/CompanyUser/**',
            }).as('deleteUser');
            
            EmployeePageHelper.openAddNewEmployeeModal()
            EmployeePageHelper.getElementFromSelector(employeePageJson.users.areaManager.companyRoleSelector , employeePageJson.users.areaManager.companyRole )
            EmployeePageHelper.selectLocationInput(employeePageJson.users.areaManager.locationType, employeePageJson.users.areaManager.locationName)
            EmployeePageHelper.typeValueToInput( employeePageJson.users.areaManager.firstNameSelector , employeePageJson.users.areaManager.firstName )
            EmployeePageHelper.typeValueToInput( employeePageJson.users.areaManager.lastNameSelector , employeePageJson.users.areaManager.lastName )
            EmployeePageHelper.typeValueToInput( employeePageJson.users.areaManager.usernameSelector , employeePageJson.users.areaManager.username )
            EmployeePageHelper.typeValueToInput( employeePageJson.users.areaManager.emailSelector , employeePageJson.users.areaManager.email )
            EmployeePageHelper.clickAddButton()
            EmployeePageHelper.waitResponseFromInviteEndpoint()
            EmployeePageHelper.userAddedAssertion()
            EmployeePageHelper.closeApproveModal()
            //delete user
            EmployeePageHelper.findUserBySearch(employeePageJson.users.areaManager.username)
            EmployeePageHelper.openUserPage(employeePageJson.users.areaManager.firstName)
            EmployeePageHelper.openEditMode()
            EmployeePageHelper.clickDeleteButton()
            EmployeePageHelper.approveUserDeletion()
        }),

        it("C116778 Add District Manager", () => {
            cy.intercept({
                method: 'POST',
                url: 'api/Auth/invite-users-to-company/**',
            }).as('addUserToCompany');
            cy.intercept({
                method: 'GET',
                url: 'api/CompanyUser/**',
            }).as('openUserPage');
            cy.intercept({
                method: 'DELETE',
                url: 'api/CompanyUser/**',
            }).as('deleteUser');
            
            EmployeePageHelper.openAddNewEmployeeModal()
            EmployeePageHelper.getElementFromSelector(employeePageJson.users.districtManager.companyRoleSelector , employeePageJson.users.districtManager.companyRole )
            EmployeePageHelper.selectLocationInput(employeePageJson.users.areaManager.locationType, employeePageJson.users.areaManager.locationName)
            EmployeePageHelper.selectLocationInput(employeePageJson.users.districtManager.locationType, employeePageJson.users.districtManager.locationName)
            EmployeePageHelper.typeValueToInput( employeePageJson.users.districtManager.firstNameSelector , employeePageJson.users.districtManager.firstName )
            EmployeePageHelper.typeValueToInput( employeePageJson.users.districtManager.lastNameSelector , employeePageJson.users.districtManager.lastName )
            EmployeePageHelper.typeValueToInput( employeePageJson.users.districtManager.usernameSelector , employeePageJson.users.districtManager.username )
            EmployeePageHelper.typeValueToInput( employeePageJson.users.districtManager.emailSelector , employeePageJson.users.districtManager.email )
            EmployeePageHelper.clickAddButton()
            EmployeePageHelper.waitResponseFromInviteEndpoint()
            EmployeePageHelper.userAddedAssertion()
            EmployeePageHelper.closeApproveModal()
            //delete user
            EmployeePageHelper.findUserBySearch(employeePageJson.users.districtManager.username)
            EmployeePageHelper.openUserPage(employeePageJson.users.districtManager.firstName)
            EmployeePageHelper.openEditMode()
            EmployeePageHelper.clickDeleteButton()
            EmployeePageHelper.approveUserDeletion()
        }),

        it("C116779 Add Store Manager", () => {
            cy.intercept({
                method: 'POST',
                url: 'api/Auth/invite-users-to-company/**',
            }).as('addUserToCompany');
            cy.intercept({
                method: 'GET',
                url: 'api/CompanyUser/**',
            }).as('openUserPage');
            cy.intercept({
                method: 'DELETE',
                url: 'api/CompanyUser/**',
            }).as('deleteUser');
            
            EmployeePageHelper.openAddNewEmployeeModal()
            EmployeePageHelper.getElementFromSelector(employeePageJson.users.storelManager.companyRoleSelector , employeePageJson.users.storelManager.companyRole )
            EmployeePageHelper.selectLocationInput(employeePageJson.users.areaManager.locationType, employeePageJson.users.areaManager.locationName)
            EmployeePageHelper.selectLocationInput(employeePageJson.users.districtManager.locationType, employeePageJson.users.districtManager.locationName)
            EmployeePageHelper.selectLocationInput(employeePageJson.users.storelManager.locationType, employeePageJson.users.storelManager.locationName)
            EmployeePageHelper.typeValueToInput( employeePageJson.users.storelManager.firstNameSelector , employeePageJson.users.storelManager.firstName )
            EmployeePageHelper.typeValueToInput( employeePageJson.users.storelManager.lastNameSelector , employeePageJson.users.storelManager.lastName )
            EmployeePageHelper.typeValueToInput( employeePageJson.users.storelManager.usernameSelector , employeePageJson.users.storelManager.username )
            EmployeePageHelper.typeValueToInput( employeePageJson.users.storelManager.emailSelector , employeePageJson.users.storelManager.email )
            EmployeePageHelper.clickAddButton()
            EmployeePageHelper.waitResponseFromInviteEndpoint()
            EmployeePageHelper.userAddedAssertion()
            EmployeePageHelper.closeApproveModal()
            //delete user
            EmployeePageHelper.findUserBySearch(employeePageJson.users.storelManager.username)
            EmployeePageHelper.openUserPage(employeePageJson.users.storelManager.firstName)
            EmployeePageHelper.openEditMode()
            EmployeePageHelper.clickDeleteButton()
            EmployeePageHelper.approveUserDeletion()
        }),

        it("C116780 Add Store Manager - View Only", () => {
            cy.intercept({
                method: 'POST',
                url: 'api/Auth/invite-users-to-company/**',
            }).as('addUserToCompany');
            cy.intercept({
                method: 'GET',
                url: 'api/CompanyUser/**',
            }).as('openUserPage');
            cy.intercept({
                method: 'DELETE',
                url: 'api/CompanyUser/**',
            }).as('deleteUser');
            
            EmployeePageHelper.openAddNewEmployeeModal()
            EmployeePageHelper.getElementFromSelector(employeePageJson.users.storelManagerVO.companyRoleSelector , employeePageJson.users.storelManagerVO.companyRole )
            EmployeePageHelper.selectLocationInput(employeePageJson.users.areaManager.locationType, employeePageJson.users.areaManager.locationName)
            EmployeePageHelper.selectLocationInput(employeePageJson.users.districtManager.locationType, employeePageJson.users.districtManager.locationName)
            EmployeePageHelper.selectLocationInput(employeePageJson.users.storelManagerVO.locationType, employeePageJson.users.storelManagerVO.locationName)
            EmployeePageHelper.typeValueToInput( employeePageJson.users.storelManagerVO.firstNameSelector , employeePageJson.users.storelManagerVO.firstName )
            EmployeePageHelper.typeValueToInput( employeePageJson.users.storelManagerVO.lastNameSelector , employeePageJson.users.storelManagerVO.lastName )
            EmployeePageHelper.typeValueToInput( employeePageJson.users.storelManagerVO.usernameSelector , employeePageJson.users.storelManagerVO.username )
            EmployeePageHelper.typeValueToInput( employeePageJson.users.storelManagerVO.emailSelector , employeePageJson.users.storelManagerVO.email )
            EmployeePageHelper.clickAddButton()
            EmployeePageHelper.waitResponseFromInviteEndpoint()
            EmployeePageHelper.userAddedAssertion()
            EmployeePageHelper.closeApproveModal()
            //delete user
            EmployeePageHelper.findUserBySearch(employeePageJson.users.storelManagerVO.username)
            EmployeePageHelper.openUserPage(employeePageJson.users.storelManagerVO.firstName)
            EmployeePageHelper.openEditMode()
            EmployeePageHelper.clickDeleteButton()
            EmployeePageHelper.approveUserDeletion()
        }),

        it("C116781 Add Employee", () => {
            cy.intercept({
                method: 'POST',
                url: 'api/Auth/invite-users-to-company/**',
            }).as('addUserToCompany');
            cy.intercept({
                method: 'GET',
                url: 'api/CompanyUser/**',
            }).as('openUserPage');
            cy.intercept({
                method: 'DELETE',
                url: 'api/CompanyUser/**',
            }).as('deleteUser');
            
            EmployeePageHelper.openAddNewEmployeeModal()
            EmployeePageHelper.getElementFromSelector(employeePageJson.users.Employee.companyRoleSelector , employeePageJson.users.Employee.companyRole )
            EmployeePageHelper.selectLocationInput(employeePageJson.users.areaManager.locationType, employeePageJson.users.areaManager.locationName)
            EmployeePageHelper.selectLocationInput(employeePageJson.users.districtManager.locationType, employeePageJson.users.districtManager.locationName)
            EmployeePageHelper.selectLocationInput(employeePageJson.users.Employee.locationType, employeePageJson.users.Employee.locationName)
            EmployeePageHelper.typeValueToInput( employeePageJson.users.Employee.firstNameSelector , employeePageJson.users.Employee.firstName )
            EmployeePageHelper.typeValueToInput( employeePageJson.users.Employee.lastNameSelector , employeePageJson.users.Employee.lastName )
            EmployeePageHelper.typeValueToInput( employeePageJson.users.Employee.usernameSelector , employeePageJson.users.Employee.username )
            EmployeePageHelper.typeValueToInput( employeePageJson.users.Employee.emailSelector , employeePageJson.users.Employee.email )
            EmployeePageHelper.clickAddButton()
            EmployeePageHelper.waitResponseFromInviteEndpoint()
            EmployeePageHelper.userAddedAssertion()
            EmployeePageHelper.closeApproveModal()
            //delete user
            EmployeePageHelper.findUserBySearch(employeePageJson.users.Employee.username)
            EmployeePageHelper.openUserPage(employeePageJson.users.Employee.firstName)
            EmployeePageHelper.openEditMode()
            EmployeePageHelper.clickDeleteButton()
            EmployeePageHelper.approveUserDeletion()
        })
    })

    context("Employee page overview", () => {
        it("C116787-Employees-Grid-Review", () => {

        })
    })
    
})