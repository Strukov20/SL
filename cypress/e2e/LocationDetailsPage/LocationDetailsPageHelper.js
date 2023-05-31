import { BaseHelper } from "../../support/BaseHelper";
import storeLabels from "../../fixtures/LocationDetails/storeDetailsLabels.json";

export class LocationDetailsAssertions extends BaseHelper {
    // assertions
    static breadcrumbsLocation(locationType) {
        cy.get('.Breadcrumbs > .Breadcrumbs__Links > a.Breadcrumbs__Link')
            .contains('Locations');
        cy.get('.Breadcrumbs__Title > .Module__Ellipsis')
            .contains(`${locationType} Details`);
    }
    
    static cardHeaderName(cardName) {
        cy.get("._Card__Header > ._Card__Title")
                .contains(cardName);
    }

    static formButton(isForm = false) {
        if (isForm) {
            cy.get("._Group > button")
                .eq(0)
                .contains("CANCEL");
            cy.get("._Group > button")
                .eq(1)
                .contains("SAVE CHANGES");
        } else {
            cy.get("._Card__Header > ._Module__Controls")
                .find("button")
                .contains("EDIT");
        }
    }

    static locationInGridView(areaName, districtName, storeName, storeType, status) {
        cy.get('._Table__Row')
            .contains(storeName)
            .parent()
            .parent()
            .within(() => {
                cy.get('._Table__Cell')
                    .eq(0)
                    .contains(storeName);
                cy.get('._Table__Cell')
                    .eq(3)
                    .contains(areaName);
                cy.get('._Table__Cell')
                    .eq(4)
                    .contains(districtName);
                cy.get('._Table__Cell')
                    .eq(1)
                    .contains(storeType);
                cy.get('._Table__Cell')
                    .eq(5)
                    .contains(status);
            });
    }

    static areaDetailsView(name, district) {
        this.breadcrumbsLocation("Area");

        cy.get('._Form > ._Grid__Row > ._Grid__Col > ._Form__Field > ._Form__Label')
            .eq(0)
            .contains('Area Name');
        cy.get('._Form > ._Grid__Row > ._Grid__Col > ._Form__Field > ._Form__View')
            .eq(0)
            .contains(name);
        cy.get('._Form > ._Grid__Row > ._Grid__Col > ._Form__Field > ._Form__Label')
            .eq(2)
            .contains('Area Manager');
        cy.get('._Form > ._Grid__Row > ._Grid__Col > ._Form__Field > ._Form__View > button')
            .contains('ASSIGN');
        cy.get('._Table__Header > ._Table__Column')
            .eq(0)
            .contains('Districts in this Area');
        cy.get('._Table__Header > ._Table__Column')
            .eq(1)
            .contains('District Manager');
        cy.get('._Table__Body > ._Table__Row > ._Table__Cell')
            .eq(0)
            .contains(district)
            .should('have.attr', 'href')
            .and('include', '/locations/districts/');
    }

    static managerAssigned(name) {
        cy.get('._Form > ._Grid__Row > ._Grid__Col > ._Form__Field > ._Form__View > ._Group > a')
            .contains(name)
            .should('have.attr', 'href')
            .and('include', '/employees/');
        cy.get('._Form > ._Grid__Row > ._Grid__Col > ._Form__Field > ._Form__View > ._Group > button')
            .contains('UNASSIGN');
    }

    static areaNameChanged(name) {
        cy.get('._Form > ._Grid__Row > ._Grid__Col > ._Form__Field > ._Form__Label')
            .eq(0)
            .contains('Area Name');
        cy.get('._Form > ._Grid__Row > ._Grid__Col > ._Form__Field > ._Form__View')
            .eq(0)
            .contains(name);
    }

    static districtDetailsView(name, area, store) {
        this.breadcrumbsLocation("District");

        cy.get('._Form > ._Grid__Row > ._Grid__Col > ._Form__Field > ._Form__Label')
            .eq(0)
            .contains('District Name');
        cy.get('._Form > ._Grid__Row > ._Grid__Col > ._Form__Field > ._Form__View')
            .eq(0)
            .contains(name);
        cy.get('._Form > ._Grid__Row > ._Grid__Col > ._Form__Field > ._Form__Label')
            .eq(1)
            .contains('Area Name');
        cy.get('._Form > ._Grid__Row > ._Grid__Col > ._Form__Field > ._Form__View')
            .eq(1)
            .contains(area);
        cy.get('._Form > ._Grid__Row > ._Grid__Col > ._Form__Field > ._Form__Label')
            .eq(2)
            .contains('District Manager');
        cy.get('._Form > ._Grid__Row > ._Grid__Col > ._Form__Field > ._Form__View > button')
            .contains("ASSIGN");
        cy.get('._Table__Header > ._Table__Column')
            .eq(0)
            .contains('Stores in this District');
        cy.get('._Table__Header > ._Table__Column')
            .eq(1)
            .contains('Store Manager');
        cy.get('._Table__Body > ._Table__Row > ._Table__Cell')
            .eq(0)
            .contains(store)
            .should('have.attr', 'href')
            .and('include', '/dashboard');
    }

    static districtNameChanged(name) {
        cy.get('._Form > ._Grid__Row > ._Grid__Col > ._Form__Field > ._Form__Label')
            .eq(0)
            .contains('District Name');
        cy.get('._Form > ._Grid__Row > ._Grid__Col > ._Form__Field > ._Form__View')
            .eq(0)
            .contains(name);
    }

    static scheduleOfStoreOpened(storeName) {
        cy.url()
            .should('include', '/dashboard');
        cy.get('.StoreSelect > .StoreSelect__Select > span')
            .contains(storeName);
        // write to check if the specified storeName is opened, not just dashboard
    }

    static storeDetailsViewGeneralSection(storeDetails) {
        this.breadcrumbsLocation("Store");
        this.storeDetailsCard(storeDetails);
        this.defaultScheduleMetrics(storeDetails.schedulingDemand, storeDetails.employeeRanking);
        this.autoInvite(storeDetails.autoInvite);
        this.storeHours(storeDetails.storeHours);
        this.storeLocationSection();
    }

    static storeDetailsCard(storeDetails) {
        let formValuesArray = Object.values(storeDetails);
        
        cy.get('._Card')
            .eq(0)
            .within(() => {
                this.cardHeaderName("Store Details");
                this.formButton(false);
                cy.get("._Card__Body > ._Form > ._Grid__Row > ._Grid__Col > ._Form__Field")
                    .each(($formField, index) => {
                        cy.wrap($formField)
                            .find("._Form__Label")
                            .contains(storeLabels[index]);
                        if (index != 6) {
                            cy.wrap($formField)
                                .find("._Form__View")
                                .contains(formValuesArray[index]);
                        }
                    });
                });
    }

    static formStoreDetailsCard(storeDetails, formFullValue) {
        let inputs = [storeDetails.name, storeDetails.sourceSystemId, "",
        storeDetails.city, formFullValue.address, storeDetails.zipPostal, storeDetails.phone];
        let selects = [storeDetails.area, storeDetails.district, storeDetails.storeType,
        formFullValue.country, formFullValue.stateProvRegion, storeDetails.status];
        
        cy.get("._Card")
            .eq(0)
            .within(() => {
                this.cardHeaderName("Store Details");
                this.formButton(true);
                cy.get("._Form__Label")
                    .each(($formLabel, index) => {
                        cy.wrap($formLabel)
                            .contains(storeLabels[index]);
                        });
                cy.get("input")
                    .each(($input, index) => {
                        cy.wrap($input)
                            .should("have.value", inputs[index]);
                        });
                cy.get('select:not([name="storeSettings.timeZone"])')
                    .each(($select, index) => {
                        cy.wrap($select, index)
                            .find(':selected')
                            .contains(selects[index]);
                        });
                    });
    }

    static defaultScheduleMetrics(schedulingKPI, employeeKPI) {
            cy.get("._Card")
                .eq(1)
                .within(() => {
                    this.cardHeaderName("Default Scheduling Metrics");
                    this.formButton(false);
                    cy.get("._Card__Body")
                        .contains(`This setting is the default setting for what forecast Shiftlab uses for automation, and what each employee is ranked by. Both of these settings can be changed by store if you do not want all stores operating with the default metrics.`);
                    cy.get("._Table__Header > ._Table__Column")
                        .eq(0)
                        .contains("Use for");
                    cy.get("._Table__Header > ._Table__Column")
                        .eq(1)
                        .contains("KPI");
                    cy.get("._Table__Body > ._Table__Row[data-key='0'] > ._Table__Cell")
                        .contains("Scheduling Demand");
                    cy.get("._Table__Body > ._Table__Row[data-key='0'] > ._Table__Cell > ._Form__Field > ._Form__View")
                        .contains(schedulingKPI);
                    cy.get("._Table__Body > ._Table__Row[data-key='1'] > ._Table__Cell")
                        .contains("Employee Ranking");
                    cy.get("._Table__Body > ._Table__Row[data-key='1'] > ._Table__Cell > ._Form__Field > ._Form__View")
                        .contains(employeeKPI);
                    });
    }

    static formDefaultScheduleMetrics(schedulingDemand, employeeRanking) {
        cy.get("._Card")
            .eq(1)
            .within(() => {
                this.cardHeaderName("Default Scheduling Metrics");
                this.formButton(true);
                cy.get("select[name='schedulingDemandMetricId']")
                    .find(":selected")
                    .contains(schedulingDemand);
                cy.get("select[name='employeeRankingDemandMetricId']")
                    .find(":selected")
                    .contains(employeeRanking);
            });
    }

    static defaultScheduleMetricsOnSchedule(graphDefaultDemandMetric) {
        cy.get(".Staff__Title > span")
            .contains("Staff");
        cy.get(".SelectDemandMetric__Option--isActive")
            .contains(graphDefaultDemandMetric);
    }

    static autoInvite(isEnabled = false) {
        cy.get("._Card")
            .eq(2)
            .within(() => {
                this.cardHeaderName("Auto Invite");
                this.formButton(false);
                cy.get("._Card__Body")
                    .contains(`This indicates whether you’d like to invite new employees for this store automatically. If "Enabled" – any user in this store will receive an invite shortly after being added. If "Disabled" – after adding a user the invite will not be sent, you are able to manually send it by clicking the "SEND INVITE" button on the employee details page.`);
                cy.get("._Form__Label")
                    .contains("Enabled");
                cy.get("input")
                    .should('be.disabled')
                    .and("have.value", `${isEnabled}`);
                });
    }

    static formAutoInvite(isEnabled) {
        cy.get("._Card")
            .eq(2)
            .within(() => {
                this.cardHeaderName("Auto Invite");
                this.formButton(true);
                cy.get('input[name="autoInvite"]')
                    .should('have.value', isEnabled.toString());
                });
    }

    static storeHours(isEnabled = true, hoursOpenings = {}, hoursClosings = {}) {
        let weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let hoursOpeningsArr  = Object.values(hoursOpenings);
        let hoursClosingsArr = Object.values(hoursClosings);

        cy.get("._Card")
            .eq(3)
            .within(() => {
                this.cardHeaderName("Store Hours");
                this.formButton(false);
                cy.get("._Card__Body")
                    .contains(`These hours indicate when your store is open. You can schedule outside of these hours, but the range for each date will show on the schedule so that you can reference it when manually scheduling. Store hours will be used when automatically building a schedule (coming soon).`);
                cy.get("input")
                    .should('be.disabled')
                    .and("have.value", `${isEnabled}`);

                if (isEnabled) {
                    cy.get("._Table__Header > ._Table__Column")
                        .eq(0)
                        .contains("Day");
                    cy.get("._Table__Header > ._Table__Column")
                        .eq(1)
                        .contains("Open");
                    cy.get("._Table__Header > ._Table__Column")
                        .eq(2)
                        .contains("Close");
                    cy.get("._Table__Body > ._Table__Row")
                        .each(($row, index) => {
                            cy.wrap($row)
                                .find("._Form__View")
                                .eq(0)
                                .contains(weekDays[index]);
                            cy.wrap($row)
                                .find("._Form__View")
                                .eq(1)
                                .contains(hoursOpeningsArr[index]);
                            cy.wrap($row)
                                .find("._Form__View")
                                .eq(2)
                                .contains(hoursClosingsArr[index]);
                        });
                } else {
                    cy.get("._Table__Header > ._Table__Column")
                        .should("not.exist");
                }
            });
    }

    static formStoreHours(hoursOpenings, hoursClosings) {
        let hoursOpeningsArr = Object.values(hoursOpenings);
        let hoursClosingsArr = Object.values(hoursClosings);

        cy.get("._Card")
            .eq(3)
            .within(() => {
                this.cardHeaderName("Store Hours");
                this.formButton(true);
                cy.get(`select[name^='workingDays'][name$='openingTime']`)
                    .find(":selected")
                    .each(($element, index) => {
                        cy.wrap($element)
                            .contains(hoursOpeningsArr[index]);
                        });
                cy.get(`select[name^='workingDays'][name$='closingTime']`)
                    .find(":selected")
                    .each(($element, index) => {
                        cy.wrap($element)
                            .contains(hoursClosingsArr[index]);
                        });
        });
    }

    static storeLocationSection() {
        cy.get("._Card")
            .eq(4)
            .within(() => {
                cy.get(".LocationMap__Title")
                    .contains("Store Location");
            });
    }

    static storeDetailsViewAutomationSection(storeDetails) {
        this.breadcrumbsLocation("Store");
        this.scheduleAutomation(storeDetails.automationToggle);
        this.openingAndClosingDuties(storeDetails.openingExtension, storeDetails.closingExtension);
        this.minMaxHoursPlan(storeDetails.minMaxPlan.name, storeDetails.minMaxPlan.description);
        this.breakPlan(storeDetails.breakPlan.name, storeDetails.breakPlan.description);
        this.minimumCoveragePlan(storeDetails.coveragePlan.name, storeDetails.coveragePlan.description);
        this.smartTemplatePlan(storeDetails.smartTemplate.name, storeDetails.smartTemplate.description);
    }

    
    
    static scheduleAutomation(isEnabled = false) {
        cy.get("._Card")
            .eq(0)
            .within(() => {
                this.cardHeaderName("Schedule Automation");
                this.formButton(false);
                cy.get("._Card__Body")
                    .contains(`This setting turns automation on and off for this location. If automation is on, the store will begin to see the “Generate” button in upcoming weeks and their schedules will be auto-built on the cadence that your company has defined.`);
                cy.get("input")
                    .should('be.disabled')
                    .and("have.value", `${isEnabled}`);
                });
    }

    static storeAutoBuildEnabled() {
        cy.get('.App__Body')
            .find('.DateSlider > .--Inline > .DateSlider__Nav')
            .eq(1)
            .click();
        cy.get('.Module__Controls > button._Button > span')
            .should('have.text', 'AUTO BUILD');
    }

    static openingAndClosingDuties(openingTime, closingTime) {
        cy.get("._Card")
            .eq(1)
            .within(() => {
                this.cardHeaderName("Opening and Closing Duties");
                this.formButton(false);
                cy.get("._Card__Body")
                    .contains(`This setting allows you to configure the time needed to open and close a store. This setting will automatically bring an opener in early and keep a closer around a little past the store’s closing time.`);
                cy.get("._Form__Label")
                    .eq(0)
                    .contains("Opening Time Extension");
                cy.get("select")
                    .eq(0)
                    .contains(openingTime);
                cy.get("._Form__Label")
                    .eq(1)
                    .contains("Closing Time Extension");
                cy.get("select")
                    .eq(1)
                    .contains(closingTime);
                });
        }

    static formOpeningAndClosingDuties(openingTime, closingTime) {
        cy.get("._Card")
            .eq(1)
            .within(() => {
                this.cardHeaderName("Opening and Closing Duties");
                this.formButton(true);
                cy.get("select[name='openingTimeExtension']")
                    .find(":selected")
                    .contains(openingTime);
                cy.get("select[name='closingTimeExtension']")
                    .find(":selected")
                    .contains(closingTime);
            });
    }
    
    static minMaxHoursPlan(name, description) {
        cy.get("._Card")
            .eq(2)
            .within(() => {
                this.cardHeaderName("Select a Min & Max Hours Plan");
                this.formButton(false);
                cy.get("._Card__Body")
                    .contains(`Your company has configured Min & Max Hours plans that will be used during the automation process. Please select a Min & Max Hours profile for this store using the selectors below. We will use these when automating schedules.`);
                cy.get("._Table__Header > ._Table__Column")
                    .eq(0)
                    .should("be.empty");
                cy.get("._Table__Header > ._Table__Column")
                    .eq(1)
                    .contains("Name");
                cy.get("._Table__Header > ._Table__Column")
                    .eq(2)
                    .contains("Description");
                cy.get("._Table__Row")
                    .find("._Table__Cell")
                    .contains('._Table__Cell', name)
                    .parent()
                    .within(() => {
                        cy.get("input")
                            .should("be.checked");
                        cy.contains(description);
                    });
                });
    }

    static breakPlan(name, description) {
        cy.get("._Card")
            .eq(3)
            .within(() => {
                this.cardHeaderName("Select a Break Plan");
                this.formButton(false);
                cy.get("._Card__Body")
                    .contains(`Your company has configured break plans that will be used during the automation process. Please select a break profile for this store using the selectors below. We will use these when automating schedules.`);
                cy.get("._Table__Header > ._Table__Column")
                    .eq(0)
                    .should("be.empty");
                cy.get("._Table__Header > ._Table__Column")
                    .eq(1)
                    .contains("Break Name");
                cy.get("._Table__Header > ._Table__Column")
                    .eq(2)
                    .contains("Description");
                cy.get("._Table__Row")
                    .contains('._Table__Cell', name)
                    .parent()
                    .within(() => {
                        cy.get("input")
                            .should("be.checked");
                        cy.contains(description);
                    });
                });
    }

    static minimumCoveragePlan(name, description) {
        cy.get("._Card")
            .eq(4)
            .within(() => {
                this.cardHeaderName("Minimum Coverage Plan");
                this.formButton(false);
                cy.get("._Card__Body")
                    .contains(`Your company has configured break plans that will be used during the automation process. Please select a break profile for this store using the selectors below. We will use these when automating schedules.`);
                cy.get("._Table__Header > ._Table__Column")
                    .eq(0)
                    .should("be.empty");
                cy.get("._Table__Header > ._Table__Column")
                    .eq(1)
                    .contains("Plan Name");
                cy.get("._Table__Header > ._Table__Column")
                    .eq(2)
                    .contains("Plan Description");
                cy.get("._Table__Row")
                    .contains("._Table__Cell", name)
                    .parent()
                    .within(() => {
                        cy.get("input")
                            .should("be.checked");
                        cy.contains(description);
                    });
                });
    }

    static smartTemplatePlan(name, description) {
        cy.get("._Card")
            .eq(5)
            .within(() => {
                this.cardHeaderName("Select a Smart Template");
                this.formButton(false);
                cy.get("._Card__Body")
                    .contains(`Your company has configured smart template plans that will be used during the automation process. Please select a smart template profile for this store using the selectors below. We will use these when automating schedules.`);
                cy.get("._Table__Header > ._Table__Column")
                    .eq(0)
                    .should("be.empty");
                cy.get("._Table__Header > ._Table__Column")
                    .eq(1)
                    .contains("Name");
                cy.get("._Table__Header > ._Table__Column")
                    .eq(2)
                    .contains("Description");
                cy.get("._Table__Row")
                    .find("._Table__Cell")
                    .contains("._Table__Cell", name)
                    .parent()
                    .within(() => {
                        cy.get("input")
                            .should("be.checked");
                        cy.contains(description);
                    });
                });
    }

    static formPlanCard(name, cardName) {
        cy.get("._Card")
            .contains(cardName)
            .parent()
            .parent()
            .within(() => {
                this.cardHeaderName(cardName);
                this.formButton(true);
                cy.get("._Table__Row")
                    .contains("._Table__Cell", name)
                    .parent()
                    .within(() => {
                        cy.get("input")
                            .should('be.checked')
                    });
            })
    }
}

export class LocationDetailsActions extends BaseHelper {
    // action methods (can have minor assertions)
    static clickOnAreaName(areaName) {
        cy.get('._Table__Row > ._Table__Cell > a')
            .contains(areaName)
            .click();
    }

    static clickOnAssignButton() {
        cy.get('._Form > ._Grid__Row > ._Grid__Col > ._Form__Field > ._Form__View > button')
            .contains('ASSIGN')
            .click();
    }

    static selectManagerName(managerName) {
        cy.get('._Modal__Body > ._Form > ._Table > ._Table__Table > ._Table__Body > ._Table__Row > ._Table__Cell')
            .find("a")
            .contains(managerName)
            .should('have.attr', 'href')
            .and('include', '/employees/');
        cy.get('._Modal__Body > ._Form > ._Table > ._Table__Table > ._Table__Body > ._Table__Row > ._Table__Cell')
            .contains(managerName)
            .parent()
            .click();
    }

    static clickOnModalAssignButton() {
        cy.get('._Modal__Footer > ._Group > button')
            .contains('ASSIGN')
            .click();
    }

    static clickOnUnassignButton() {
        cy.get('._Form > ._Grid__Row > ._Grid__Col > ._Form__Field > ._Form__View > ._Group > button')
            .contains('UNASSIGN')
            .click();
    }

    static clickOnModalUnassignButton() {
        cy.get('._Dialog__Footer > ._Group > button')
            .contains('Ok')
            .click();
    }

    static clickOnEditButton() {
        cy.get('.Module__Controls > ._Group > ._Group > button')
            .contains('EDIT')
            .click();
    }

    static changeLocationName(fromAreaName, toAreaName) {
        cy.get('._Form > ._Grid__Row > ._Grid__Col > ._Form__Field > ._Input._Form__Input > ._TextInput__Wrapper > input')
            .eq(0)
            .should('have.value', fromAreaName)
            .clear()
            .type(toAreaName);
    }

    static clickOnSaveChangesButton() {
        cy.get('.Module__Header > .Module__Controls > ._Group > ._Group > button')
            .contains('SAVE CHANGES')
            .click();
    }

    static clickOnDistrictName(districtName) {
        cy.get('._Table__Body > ._Table__Row > ._Table__Cell')
            .contains(districtName)
            .click();
    }

    static clickOnStoreName(storeName) {
        cy.get('._Table__Body > ._Table__Row > ._Table__Cell')
            .contains(storeName)
            .click();
    }

    static clickOnStoreDetailsButton(storeName) {
        cy.get('.Module__Controls > .Search > input')
            .clear()
        cy.get('.Module__Controls > .Search > input')
            .type(storeName);
        cy.get('.Module__Controls > .Search > button')
            .click();

        cy.intercept({
            method: 'GET',
            url: 'https://shyftlab-production-api.azurewebsites.net/api/Store*',
        }).as('storeSearch');
        cy.wait('@storeSearch');

        cy.get("._Table__Row")
            .contains(storeName)
            .parent()
            .parent()
            .within(() => {
                cy.get("._Table__Cell")
                    .eq(6)
                    .find('button')
                    .click();
            });
    }

    static clickOnStoreDetailsFromSchedule() {
        cy.get(".Staff__Title > span")
            .contains("Staff");
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(1000);
        cy.get(".MobileControl__Button")
            .click();
        cy.get("._Menu__Option")
            .contains("Settings")
            .click();
    }

    static clickOnViewSchedule() {
        cy.get(".Module__Header > .Module__Controls > ._Group > ._Button")
            .contains("VIEW SCHEDULE")
            .click();
    }

    static clickOnAutomationSection() {
        cy.get('.TabsModule__Section')
            .contains("Automation")
            .click();
    }

    static clickOnEditCardButton(card) {
        cy.get('._Card')
            .contains(card)
            .parent()
            .parent()
            .within(() => {
                cy.get('._Group > ._Button')
                    .contains("EDIT")
                    .click();
                LocationDetailsAssertions.formButton(true);
            });
    }

    static clickOnSaveChangesCardButton(card) {
        cy.get('._Card')
            .contains(card)
            .parent()
            .parent()
            .within(() => {
                cy.get('._Group > button')
                    .contains("SAVE")
                    .click();
                LocationDetailsAssertions.formButton(false);
            });
    }

    static formStoreDetailsSectionWrite(storeDetails, formFullValue) {
        let inputs = [storeDetails.name, storeDetails.city, formFullValue.address, storeDetails.zipPostal, storeDetails.phone];
        let selects = [storeDetails.area, storeDetails.district, storeDetails.storeType,
        formFullValue.timeZone, formFullValue.country, formFullValue.stateProvRegion, storeDetails.status];

        cy.get("._Card")
            .eq(0)
            .within(() => {
                cy.get("input:enabled")
                    .each(($input, index) => {
                        cy.wrap($input)
                            .clear({force: true});
                        cy.wrap($input)
                            .type(inputs[index]);
                        });
                cy.get("select")
                    .each(($select, index) => {
                        cy.wrap($select, index)
                            .select(selects[index], {force: true});
                        });
            });
    }

    static selectDefaultScheduleMetrics(schedulingDemand, employeeRanking) {
        cy.get("._Card")
            .eq(1)
            .within(() => {
                cy.get("select[name='schedulingDemandMetricId']")
                    .select(schedulingDemand);
                cy.get("select[name='employeeRankingDemandMetricId']")
                    .select(employeeRanking);
            });
    }

    static clickOnToggle(cardName) {
        cy.get("._Card")
            .contains(cardName)
            .parent()
            .parent()
            .find("label._ToggleInput__Input")
            .click("left");
    }

    static selectHours(hours, selectType) {
        let hoursArr = Object.values(hours);

        cy.get(`select[name^='workingDays'][name$='${selectType}Time']`)
            .each(($element, index) => {
                cy.wrap($element)
                    .select(hoursArr[index]);
            })
    }

    static selectOpeningAndClosingDuties(openingTime, closingTime) {
        cy.get("._Card")
            .eq(1)
            .find("select[name='openingTimeExtension']")
            .select(openingTime);
        cy.get("._Card")
            .eq(1)
            .find("select[name='closingTimeExtension']")
            .select(closingTime);
    }

    static selectPlanCard(name, cardName) {
        cy.get('._Card')
            .contains(cardName)
            .parent()
            .parent()
            .within(() => {
                cy.get("._Table__Row")
                    .find("._Table__Cell")
                    .contains('._Table__Cell', name)
                    .parent()
                    .within(() => {
                        cy.get("._CheckboxInput__Input")
                            .click();
                        });
                    });
    }
}