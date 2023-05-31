import { BaseHelper } from "../../support/BaseHelper";

export class LocationsPageHelper extends BaseHelper {

    static auctionStoreFilePath = 'cypress/fixtures/Locations/LocationsFixtureAuctionStore.xlsx'
    static ashStoreFilePath = 'cypress/fixtures/Locations/LocationsFixtureAshStore.xlsx'

    static newAreaName = 'Cypress Area ' + this.getTodayWithSeconds();
    static newDistrictName = 'Cypress District ' + this.getTodayWithSeconds();
    static newStoreName = 'Cypress Store ' + this.getTodayWithSeconds();
    static storeNames = [this.newStoreName, 'Auction_Store', 'Ash_Store'];

    static addLocationSelector = '.Module__Controls > ._Group';
    static typeLocationSelector = '._Modal__Body > :nth-child(1)._Form > :nth-child(1)._Form__Field > label._Input > select'

    // helpers, functions, other
    static locationRequest(locationType, locationId, token) {
        cy.request({
            method: "DELETE",
            url: BaseHelper.apiURL + `/api/${locationType}/` + locationId,
            failOnStatusCode: false,
            headers: {
                'Authorization': token,
                'X-Referer': BaseHelper.baseUrl
            },
        });
    }

    static deleteLocations(token) {
        // get store id's and district id's of this stores
        cy.request({
            method: 'GET',
            url: BaseHelper.apiURL + '/api/Store',
            failOnStatusCode: false,
            headers: {
                'Authorization': token,
                'X-Referer': BaseHelper.baseUrl
                },
            })
            .its('body.data')
            .then((responseBodyData) => {

                const newDistrictId = responseBodyData.find(item => item.name == this.newStoreName)?.district;
                cy.log(`District id that be deleted: ${newDistrictId}`)

                this.storeNames.forEach((element) => {
                    cy.log(`${element} store id: ${responseBodyData.find(item => item.name == element)?.id}`)
                    this.locationRequest('Store', (responseBodyData.find(item => item.name == element)?.id), token)
                });

                this.locationRequest('District', newDistrictId, token);
            });
        // get areas id, then delete area
        cy.request({
            method : 'GET',
            url : BaseHelper.apiURL + '/api/Area',
            failOnStatusCode: false,
            headers : {
                'Authorization': token,
                'X-Referer': "https://cypress-tests.myshiftlab.app/"
                },
            })
            .its('body.data')
            .then((responseBodyData) => {
                cy.log(`${this.newAreaName} area id: ${responseBodyData.find(item => item.name == this.newAreaName)?.id}`);
                this.locationRequest('Area', (responseBodyData.find(item => item.name == this.newAreaName)?.id), token);
            });
    }

    // action methods
    static clickAddLocationButton() {
        
        cy.get(this.addLocationSelector)
            .contains('ADD LOCATION')
            .click();
    }

    static clickCreateButton() {

        cy.get('._Modal__Footer')
            .find('button')
            .eq(1)
            .contains('CREATE')
            .click();
    }

    static clickImportButton() {

        cy.get('.Module__Controls > ._Group')
            .contains('IMPORT')
            .click();
    }

    static clickOkButton() {
        
        cy.get('._Modal__Footer > ._Group > ._Button')
            .contains('OK')
            .click();
    }

    static dragAndDropFile(filePath) {
        cy.get('._FileInput__DropZone')
            .selectFile(filePath, {
                action: 'drag-drop'
            });
    }

    static createNewArea() {
      
        cy.get(this.typeLocationSelector)
            .select('Area');
        cy.get('input[name="areaName"]')
            .type(LocationsPageHelper.newAreaName);
        this.clickCreateButton();
    }

    static createNewDistrict() {

        cy.get(this.typeLocationSelector)
            .select('District');
        cy.get('select[name="areaId"]')
            .select(LocationsPageHelper.newAreaName);
        cy.get('input[name="districtName"]')
            .type(LocationsPageHelper.newDistrictName);
        this.clickCreateButton();
    }

    static createNewStore() {

        cy.get(this.typeLocationSelector)
            .select('Store');
        cy.get('select[name="areaId"]')
            .select(LocationsPageHelper.newAreaName);
        cy.get('select[name="districtId"]')
            .select(LocationsPageHelper.newDistrictName);
        cy.get('input[name="storeName"]')
            .type(LocationsPageHelper.newStoreName);
        cy.get('select[name="storeTypeId"]')
            .select('Middle');
        this.clickCreateButton();
    }

    static sortByStoreDescending() {
        
        cy.get('._Table__Header > ._Table__Column')
            .eq(0)
            .find('.Sort > svg')
            .eq(1)
            .click();
    }

    static sortByStoreAscending() {

        cy.get('._Table__Header > ._Table__Column')
            .eq(0)
            .find('.Sort > svg')
            .eq(0)
            .click();
    }

    static sortByManagerAscending() {

        cy.get('._Table__Header > ._Table__Column')
            .eq(2)
            .find('.Sort > svg')
            .eq(0)
            .click();
    }

    static sortByManagerDescending() {

        cy.get('._Table__Header > ._Table__Column')
            .eq(2)
            .find('.Sort > svg')
            .eq(1)
            .click();
    }

    static sortByAreaAscending() {

        cy.get('._Table__Header > ._Table__Column')
            .eq(3)
            .find('.Sort > svg')
            .eq(0)
            .click();
    }

    static sortByAreaDescending() {

        cy.get('._Table__Header > ._Table__Column')
            .eq(3)
            .find('.Sort > svg')
            .eq(1)
            .click();
    }

    static sortByDistrictAscending() {

        cy.get('._Table__Header > ._Table__Column')
            .eq(4)
            .find('.Sort > svg')
            .eq(0)
            .click();
    }

    static sortByDistrictDescending() {

        cy.get('._Table__Header > ._Table__Column')
            .eq(4)
            .find('.Sort > svg')
            .eq(1)
            .click();
    }

    static filterByStoreType(storeType) {

        cy.get('._Table__Header > ._Table__Column')
            .eq(1)
            .find('svg')
            .click();
        cy.get('.Filter > ._DropDown > ._DropDown__Body > label')
            .contains(`${storeType}`)
            .find('label._Input')
            .click();
    }

    static resetStoreTypeFilter() {
        
        cy.get('._Table__Header > ._Table__Column')
            .eq(1)
            .find('svg')
            .click();
        cy.get('.Filter > ._DropDown > ._DropDown__Body > button')
            .click();
    }

    static filterByStoreStatus(status) {

        cy.get('._Table__Header > ._Table__Column')
            .eq(5)
            .find('svg')
            .click();
        cy.get('.Filter > ._DropDown > ._DropDown__Body > label')
            .contains(`${status}`)
            .find('label._Input')
            .click();
    }

    static resetStoreStatus() {

        cy.get('._Table__Header > ._Table__Column')
            .eq(5)
            .find('svg')
            .click();
        cy.get('.Filter > ._DropDown > ._DropDown__Body > button')
            .click();        
    }

    // assertion methods
    static storeVisibilityAssertion(storeName) {
        cy.intercept({
            method: 'GET',
            url: 'https://shyftlab-production-api.azurewebsites.net/api/Store*',
        }).as('storeSearch');
        cy.wait('@storeSearch');

        cy.get('.Module__Controls > .Search > input')
            .clear()
        cy.get('.Module__Controls > .Search > input')
            .type(storeName);
        cy.get('.Module__Controls > .Search > button')
            .click();
        cy.contains(storeName)
            .should('have.attr', 'href')
            .and('include', '/dashboard/');
    }

    static storeAppointedToAreaAsserion() {
      
        cy.contains(LocationsPageHelper.newStoreName)
            .parent()
            .parent()
            .contains(LocationsPageHelper.newAreaName)
            .should('have.attr', 'href')
            .and('include', '/locations/areas/');
    }

    static storeAppointedToDistrictAsserion() {
        
        cy.contains(LocationsPageHelper.newStoreName)
            .parent()
            .parent()
            .contains(LocationsPageHelper.newDistrictName)
            .should('have.attr', 'href')
            .and('include', '/locations/districts');
    }

    static sortedByStoreDescendingAssertion() {
        
        cy.get('div._Table__Row[data-key="0"] > ._Table__Cell > a')
            .contains('Sword_Store');
        cy.get('div._Table__Row[data-key="1"] > ._Table__Cell > a')
            .contains('Repair_Store');
    }
    
    static sortedByStoreAscendingAssertion() {

        cy.get('div._Table__Row[data-key="0"] > ._Table__Cell > a')
            .contains('Arrow_Store');
        cy.get('div._Table__Row[data-key="1"] > ._Table__Cell > a')
            .contains('Axe_Store');
    }

    static sortedByManagerAscendingAssertion() {

        cy.get('div._Table__Row[data-key="0"] > ._Table__Cell')
            .eq(2)
            .contains('Not assigned');
    }

    static sortedByManagerDescendingAssertion() {

        cy.get('div._Table__Row[data-key="0"] > ._Table__Cell')
            .eq(2)
            .contains('Vasul Gonchar');
        cy.get('div._Table__Row[data-key="1"] > ._Table__Cell')
            .eq(2)
            .contains('Petro Nagirnuy');
    }

    static sortedByAreaAscendingAssertion() {

        cy.get('div._Table__Row[data-key="0"] > ._Table__Cell')
            .eq(3)
            .contains('Area for area grid sorting_1');
        cy.get('div._Table__Row[data-key="1"] > ._Table__Cell')
            .eq(3)
            .contains('Area for area grid sorting_1');
    }

    static sortedByAreaDescendingAssertion() {

        cy.get('div._Table__Row[data-key="0"] > ._Table__Cell')
            .eq(3)
            .contains('Stormwind');
        cy.get('div._Table__Row[data-key="1"] > ._Table__Cell')
            .eq(3)
            .contains('Stormwind');
    }

    static sortedByDistrictAscendingAssertion() {
      
        cy.get('div._Table__Row[data-key="0"] > ._Table__Cell')
            .eq(4)
            .contains('A_ District for district grid sorting_1');
        cy.get('div._Table__Row[data-key="1"] > ._Table__Cell')
            .eq(4)
            .contains('A_ District for district grid sorting_1');
    }

    static sortedByDistrictDescendingAssertion() {

        cy.get('div._Table__Row[data-key="0"] > ._Table__Cell')
            .eq(4)
            .contains('Valley_Of_Honor');
        cy.get('div._Table__Row[data-key="1"] > ._Table__Cell')
            .eq(4)
            .contains('Valley_Of_Honor');
    }

    static storesNotRepeatAtOtherPagesAssertion() {
        cy.get('._Table__Row[data-key="0"] > ._Table__Cell')
            .eq(0)
            .should('not.contain', 'Arrow_Store');
    }

    static allTypesPresentedHelper() {
        
        // nth-child here, because of only .get retry (with .eq() we cant do this)
        cy.get('._Table__Row > :nth-child(2)')
            .contains('Small');
        cy.get('._Table__Row > :nth-child(2)')
            .contains('Middle');
        cy.get('._Table__Row > :nth-child(2)')
            .contains('Big');
    }

    static allStoreTypesPresentedAssertion() {

        this.allTypesPresentedHelper();
        this.goToLastPage();
        this.allTypesPresentedHelper();
    }

    static storeTypePresentedAssertion(storeType) {

        cy.get('._Table__Row > :nth-child(2)')
            .contains(`${storeType}`);
    }

    static storeTypeExcludedAssertion(storeType) {

        cy.get('._Table__Row > :nth-child(2)')
            .should('not.contain', `${storeType}`);
    }

    static storeStatusPresentedAssertion(storeType) {

        cy.get('._Table__Row > :nth-child(6)')
            .find('._Badge')
            .contains(`${storeType}`);
    }

    static allStoreStatusPresentedAssertion() {
        
        this.goToLastPage();
        cy.get('._Table__Row > :nth-child(6)')
            .find('._Badge')
            .contains("Active");
        cy.get('._Table__Row > :nth-child(6)')
            .find('._Badge')
            .contains("Disabled");
    }

    static fileUploadedAssertion(storeName) {

        cy.get('.Header > .Header__Flex > .Header__Notification > ._Button.Notification__Bell')
            .click();
        cy.get('.Notification > .Notification__List > .List__Item')
            .eq(1)
            .find('.Content > .Notification-Progress > .Notification-Progress__Step')
            .eq(4, { timeout: 10000000 })
            .should('have.class', 'Notification-Progress__Step--Done')
        cy.reload();
        LocationsPageHelper.storeVisibilityAssertion(storeName);
    }
}
