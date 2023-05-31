import { LocationDetailsAssertions as Assert } from "./LocationDetailsPageHelper";
import { LocationDetailsActions as Act } from "./LocationDetailsPageHelper";
import locationDetails from "../../fixtures/LocationDetails/locationDetails.json";

beforeEach(function () {

    Act.login();
    Act.goToLocationsPage();
});

describe('Location Details: Area Details', function() {
    it('С116766: Area Details', function () {

        Act.clickOnAreaName(locationDetails.area.name);
        Assert.areaDetailsView(locationDetails.area.name, locationDetails.area.district);
        Act.clickOnAssignButton();
        Assert.modulePaginationCheck();
        Act.selectManagerName(locationDetails.area.manager);
        Act.clickOnModalAssignButton();
        Assert.managerAssigned(locationDetails.area.manager);
        Act.clickOnUnassignButton();
        Act.clickOnModalUnassignButton();
        Assert.areaDetailsView(locationDetails.area.name, locationDetails.area.district);
        Act.clickOnEditButton();
        Act.changeLocationName(locationDetails.area.name, "test_new_area_name");
        Act.clickOnSaveChangesButton();
        Assert.areaNameChanged("test_new_area_name");
        Act.goToLocationsPage();
        Assert.locationInGridView("test_new_area_name",
        locationDetails.area.district, locationDetails.area.store.name, locationDetails.area.store.storeType, locationDetails.area.store.status);
        Act.clickOnAreaName("test_new_area_name");
        Act.clickOnEditButton();
        Act.changeLocationName("test_new_area_name", locationDetails.area.name);
        Act.clickOnSaveChangesButton();
        Assert.areaNameChanged(locationDetails.area.name);
        Act.clickOnDistrictName(locationDetails.area.district);
        Assert.districtDetailsView(locationDetails.area.district, locationDetails.area.name, locationDetails.area.store.name);
    });
});

describe('Location Details: District Details', function() {
    it('C116767: District Details', function () {

        Act.clickOnDistrictName(locationDetails.district.name);
        Assert.districtDetailsView(locationDetails.district.name, locationDetails.district.area, locationDetails.district.store.name);
        Act.clickOnAssignButton();
        Assert.modulePaginationCheck();
        Act.selectManagerName(locationDetails.district.manager);
        Act.clickOnModalAssignButton();
        Assert.managerAssigned(locationDetails.district.manager);
        Act.clickOnUnassignButton();
        Act.clickOnModalUnassignButton();
        Assert.districtDetailsView(locationDetails.district.name, locationDetails.district.area, locationDetails.district.store.name);
        Act.clickOnEditButton();
        Act.changeLocationName(locationDetails.district.name, "test_new_district_name");
        Act.clickOnSaveChangesButton();
        Assert.districtNameChanged("test_new_district_name");
        Act.goToLocationsPage();
        Assert.locationInGridView(locationDetails.district.area,
        "test_new_district_name", locationDetails.district.store.name, locationDetails.district.store.storeType, locationDetails.district.store.status);
        Act.clickOnDistrictName("test_new_district_name");
        Act.clickOnEditButton();
        Act.changeLocationName("test_new_district_name", locationDetails.district.name);
        Act.clickOnSaveChangesButton();
        Assert.districtNameChanged(locationDetails.district.name);
        Act.clickOnStoreName(locationDetails.district.store.name);
        Assert.scheduleOfStoreOpened(locationDetails.district.store.name);
    });
});

describe.only('Location Details: Store Details', function() {
    beforeEach(function() {

        Act.clickOnStoreDetailsButton(locationDetails.store.name);
    });

    it('C116783: General/Automation Store Details review', function () {

        Assert.storeDetailsViewGeneralSection(locationDetails.store);
        Act.clickOnAutomationSection();
        Assert.storeDetailsViewAutomationSection(locationDetails.store);
    });

    it('C116768: General Store Details - Edit Store Details section', function () {
        // you should use endpoint to insert Timezone to Store; can use only Axe_Store here because of this
        Act.clickOnEditCardButton("Store Details");
        Assert.formStoreDetailsCard(locationDetails.store, locationDetails.store.formFullValue);
        Act.formStoreDetailsSectionWrite(locationDetails.storeEntry, locationDetails.storeEntry.formFullValue);
        Assert.formStoreDetailsCard(locationDetails.storeEntry, locationDetails.storeEntry.formFullValue);
        Act.clickOnSaveChangesCardButton("Store Details");
        Assert.storeDetailsCard(locationDetails.storeEntry);
        Act.clickOnEditCardButton("Store Details");
        Act.formStoreDetailsSectionWrite(locationDetails.store, locationDetails.store.formFullValue);
        Act.clickOnSaveChangesCardButton("Store Details");
    });

    it('C117060: General Store Details - Edit Default Scheduling Metrics', function() {

        Act.clickOnEditCardButton("Default Scheduling Metrics");
        Act.selectDefaultScheduleMetrics(locationDetails.storeEntry.schedulingDemand, locationDetails.storeEntry.employeeRanking);
        Assert.formDefaultScheduleMetrics(locationDetails.storeEntry.schedulingDemand, locationDetails.storeEntry.employeeRanking);
        Act.clickOnSaveChangesCardButton("Default Scheduling Metrics");
        Assert.defaultScheduleMetrics(locationDetails.storeEntry.schedulingDemand, locationDetails.storeEntry.employeeRanking);
        Act.clickOnViewSchedule();
        Assert.defaultScheduleMetricsOnSchedule(locationDetails.storeEntry.schedulingDemand);
        Act.clickOnStoreDetailsFromSchedule();
        Act.clickOnEditCardButton("Default Scheduling Metrics");
        Act.selectDefaultScheduleMetrics(locationDetails.store.schedulingDemand, locationDetails.store.employeeRanking);
        Assert.formDefaultScheduleMetrics(locationDetails.store.schedulingDemand, locationDetails.store.employeeRanking);
        Act.clickOnSaveChangesCardButton("Default Scheduling Metrics");
        Assert.defaultScheduleMetrics(locationDetails.store.schedulingDemand, locationDetails.store.employeeRanking);
    });

    it('C116769: General Store Details - Edit Auto Invite section', function() {

        Act.clickOnEditCardButton("Auto Invite");
        Act.clickOnToggle("Auto Invite");
        Assert.formAutoInvite(locationDetails.storeEntry.autoInvite);
        Act.clickOnSaveChangesCardButton("Auto Invite");
        Assert.autoInvite(locationDetails.storeEntry.autoInvite);
        Act.clickOnEditCardButton("Auto Invite");
        Act.clickOnToggle("Auto Invite");
        Act.clickOnSaveChangesCardButton("Auto Invite");
    });

    it('C116770: General Store Details - Edit Store Hours', function () {

        Assert.storeHours(locationDetails.store.storeHours);
        Act.clickOnEditCardButton("Store Hours");
        Assert.formButton();
        Act.clickOnToggle("Store Hours");
        Act.selectHours(locationDetails.storeEntry.openings, "opening");
        Act.selectHours(locationDetails.storeEntry.closings, "closing");
        Assert.formStoreHours(locationDetails.storeEntry.openings, locationDetails.storeEntry.closings);
        Act.clickOnSaveChangesCardButton("Store Hours");
        Assert.storeHours(locationDetails.storeEntry.storeHours, locationDetails.storeEntry.openings, locationDetails.storeEntry.closings);
        Act.clickOnEditCardButton("Store Hours");
        Act.clickOnToggle("Store Hours");
        Act.clickOnSaveChangesCardButton("Store Hours");
    });

    it('C116772: Automation Store Details - Edit Schedule Automation Section', function() {

        Act.clickOnAutomationSection();
        Assert.scheduleAutomation(locationDetails.store.automationToggle);
        Act.clickOnEditCardButton("Schedule Automation");
        Act.clickOnToggle("Schedule Automation");
        Act.clickOnSaveChangesCardButton("Schedule Automation");
        Assert.scheduleAutomation(locationDetails.storeEntry.automationToggle);
        Act.clickOnViewSchedule();
        Assert.storeAutoBuildEnabled();
        Act.clickOnStoreDetailsFromSchedule();
        Act.clickOnAutomationSection();
        Act.clickOnEditCardButton("Schedule Automation");
        Act.clickOnToggle("Schedule Automation");
        Act.clickOnSaveChangesCardButton("Schedule Automation");
    });

    it('C116773: Automation Store Details - Edit Opening and Closing Duties section', function() {

        Act.clickOnAutomationSection();
        Assert.openingAndClosingDuties(locationDetails.store.openingExtension, locationDetails.store.closingExtension)
        Act.clickOnEditCardButton("Opening and Closing Duties");
        Act.selectOpeningAndClosingDuties(locationDetails.storeEntry.openingExtension, locationDetails.storeEntry.closingExtension);
        Assert.formOpeningAndClosingDuties(locationDetails.storeEntry.openingExtension, locationDetails.storeEntry.closingExtension);
        Act.clickOnSaveChangesCardButton("Opening and Closing Duties");
        Assert.openingAndClosingDuties(locationDetails.storeEntry.openingExtension, locationDetails.storeEntry.closingExtension);
        Act.clickOnEditCardButton("Opening and Closing Duties");
        Act.selectOpeningAndClosingDuties(locationDetails.store.openingExtension, locationDetails.store.closingExtension);
        Act.clickOnSaveChangesCardButton("Opening and Closing Duties");
    });

    it('C120446: Automation Store Details - Edit Select a Min & Max Hours Plan', function() {

        Act.clickOnAutomationSection();
        Assert.minMaxHoursPlan(locationDetails.store.minMaxPlan.name, locationDetails.store.minMaxPlan.description);
        Act.clickOnEditCardButton("Select a Min & Max Hours Plan");
        Act.selectPlanCard(locationDetails.storeEntry.minMaxPlan.name, "Select a Min & Max Hours Plan");
        Assert.formPlanCard(locationDetails.storeEntry.minMaxPlan.name, "Select a Min & Max Hours Plan");
        Act.clickOnSaveChangesCardButton("Select a Min & Max Hours Plan");
        Assert.minMaxHoursPlan(locationDetails.storeEntry.minMaxPlan.name, locationDetails.storeEntry.minMaxPlan.description);
        Act.clickOnEditCardButton("Select a Min & Max Hours Plan");
        Act.selectPlanCard(locationDetails.store.minMaxPlan.name, "Select a Min & Max Hours Plan");
        Act.clickOnSaveChangesCardButton("Select a Min & Max Hours Plan");
    });

    it('C116774: Automation Store Details - Edit Select Break Plan section', function() {

        Act.clickOnAutomationSection();
        Assert.breakPlan(locationDetails.store.breakPlan.name, locationDetails.store.breakPlan.description);
        Act.clickOnEditCardButton("Select a Break Plan");
        Act.selectPlanCard(locationDetails.storeEntry.breakPlan.name, "Select a Break Plan");
        Assert.formPlanCard(locationDetails.storeEntry.breakPlan.name, "Select a Break Plan");
        Act.clickOnSaveChangesCardButton("Select a Break Plan");
        Assert.breakPlan(locationDetails.storeEntry.breakPlan.name, locationDetails.storeEntry.breakPlan.description);
        Act.clickOnEditCardButton("Select a Break Plan");
        Act.selectPlanCard(locationDetails.store.breakPlan.name, "Select a Break Plan");
        Act.clickOnSaveChangesCardButton("Select a Break Plan");
    });

    it('C116775: Automation Store Details - Edit Minimum Coverage Plan section', function() {

        Act.clickOnAutomationSection();
        Assert.minimumCoveragePlan(locationDetails.store.coveragePlan.name, locationDetails.store.coveragePlan.description);
        Act.clickOnEditCardButton("Minimum Coverage Plan");
        Act.selectPlanCard(locationDetails.storeEntry.coveragePlan.name, "Minimum Coverage Plan");
        Assert.formPlanCard(locationDetails.storeEntry.coveragePlan.name, "Minimum Coverage Plan");
        Act.clickOnSaveChangesCardButton("Minimum Coverage Plan");
        Assert.minimumCoveragePlan(locationDetails.store.coveragePlan.name, locationDetails.store.coveragePlan.description);
        Assert.minimumCoveragePlan(locationDetails.storeEntry.coveragePlan.name, locationDetails.storeEntry.coveragePlan.name);
        Act.clickOnEditCardButton("Minimum Coverage Plan");
        Act.selectPlanCard(locationDetails.storeEntry.coveragePlan.name, "Minimum Coverage Plan");
        Act.clickOnSaveChangesCardButton("Minimum Coverage Plan");
    });

    it('C126848: Automation Store Details - Smart Template Plans', function() {

        Act.clickOnAutomationSection();
        Assert.smartTemplatePlan(locationDetails.store.smartTemplate.name, locationDetails.store.smartTemplate.description);
        Act.clickOnEditCardButton("Select a Smart Template");
        Act.selectPlanCard(locationDetails.storeEntry.smartTemplate.name, "Select a Smart Template");
        Assert.formPlanCard(locationDetails.storeEntry.smartTemplate.name, "Select a Smart Template");
        Act.clickOnSaveChangesCardButton("Select a Smart Template");
        Assert.smartTemplatePlan(locationDetails.storeEntry.smartTemplate.name, locationDetails.storeEntry.smartTemplate.description);
        Act.clickOnEditCardButton("Select a Smart Template");
        Act.selectPlanCard(locationDetails.store.smartTemplate.name, "Select a Smart Template");
        Act.clickOnSaveChangesCardButton("Select a Smart Template");
    });
});
