import { LocationsPageHelper } from "./LocationsPageHelper";

beforeEach(function () {

    LocationsPageHelper.login();
    LocationsPageHelper.goToLocationsPage();
});

describe('Locations Page tests', function () {
    it('C116786: Location Grid Review', function () {

        cy.get('.Header > .Header__Flex')
            .contains('John Smith');
        cy.get('.Module__Top')
            .contains('Locations');

        LocationsPageHelper.modulePaginationCheck();
    });

    it('C116755: Add Location', function () {

        LocationsPageHelper.clickAddLocationButton();
        LocationsPageHelper.createNewArea();
        LocationsPageHelper.clickAddLocationButton();
        LocationsPageHelper.createNewDistrict();
        LocationsPageHelper.clickAddLocationButton();
        LocationsPageHelper.createNewStore();
        LocationsPageHelper.storeVisibilityAssertion(LocationsPageHelper.newStoreName);
        LocationsPageHelper.storeAppointedToAreaAsserion();
        LocationsPageHelper.storeAppointedToDistrictAsserion();
    });

    it('C116759: Grid Sorting', function () {
        
        LocationsPageHelper.sortByStoreDescending();
        LocationsPageHelper.sortedByStoreDescendingAssertion();
        LocationsPageHelper.sortByStoreAscending();
        LocationsPageHelper.sortedByStoreAscendingAssertion();
        LocationsPageHelper.sortByManagerAscending();
        LocationsPageHelper.sortedByManagerAscendingAssertion();
        LocationsPageHelper.sortByManagerDescending();
        LocationsPageHelper.sortedByManagerDescendingAssertion();
        LocationsPageHelper.sortByAreaAscending();
        LocationsPageHelper.sortedByAreaAscendingAssertion();
        LocationsPageHelper.sortByAreaDescending();
        LocationsPageHelper.sortedByAreaDescendingAssertion();
        LocationsPageHelper.sortByDistrictAscending();
        LocationsPageHelper.sortedByDistrictAscendingAssertion();
        LocationsPageHelper.sortByDistrictDescending();
        LocationsPageHelper.sortedByDistrictDescendingAssertion();
    });

    it('C116764: Pagination', function() {

        // ascending by store name is enabled by default
        LocationsPageHelper.sortedByStoreAscendingAssertion();
        LocationsPageHelper.modulePaginationCheck();
        LocationsPageHelper.goToNextPage();
        LocationsPageHelper.modulePaginationCheck();
        LocationsPageHelper.storesNotRepeatAtOtherPagesAssertion();
    });

    it('C116760: Grid Filtering', function() {

        LocationsPageHelper.allStoreTypesPresentedAssertion();

        LocationsPageHelper.filterByStoreType("Big");
        LocationsPageHelper.storeTypePresentedAssertion("Big");

        LocationsPageHelper.storeTypeExcludedAssertion("Middle");
        LocationsPageHelper.storeTypeExcludedAssertion("Small");

        LocationsPageHelper.filterByStoreType("Middle");

        LocationsPageHelper.storeTypeExcludedAssertion("Big");
        LocationsPageHelper.storeTypeExcludedAssertion("Small");

        LocationsPageHelper.filterByStoreType("Small");

        LocationsPageHelper.storeTypeExcludedAssertion("Big");
        LocationsPageHelper.storeTypeExcludedAssertion("Middle");

        LocationsPageHelper.resetStoreTypeFilter();
        LocationsPageHelper.allStoreTypesPresentedAssertion();

        LocationsPageHelper.filterByStoreStatus("Disabled");
        LocationsPageHelper.storeStatusPresentedAssertion("Disabled");

        LocationsPageHelper.filterByStoreStatus("Active");
        LocationsPageHelper.storeStatusPresentedAssertion("Active");

        LocationsPageHelper.resetStoreStatus();
        LocationsPageHelper.allStoreStatusPresentedAssertion();
    });

    it('C116765: Import', function() {

        LocationsPageHelper.clickImportButton();
        LocationsPageHelper.uploadFile(LocationsPageHelper.auctionStoreFilePath);
        LocationsPageHelper.clickOkButton();

        LocationsPageHelper.fileUploadedAssertion('Auction_Store');

        LocationsPageHelper.clickImportButton();
        LocationsPageHelper.dragAndDropFile(LocationsPageHelper.ashStoreFilePath);
        LocationsPageHelper.clickOkButton();

        LocationsPageHelper.fileUploadedAssertion('Ash_Store');
    });

    it('DELETE LOCATIONS', function() {

        cy.getCookie('auth')
            .then((auth) => {
                let accessToken = JSON.parse(decodeURIComponent(auth.value)).accessToken
                LocationsPageHelper.deleteLocations(accessToken)
            });
    });
});
