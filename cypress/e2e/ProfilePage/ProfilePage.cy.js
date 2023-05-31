import { ProfilePageHelper } from "../ProfilePage/ProfilePageHelper"

beforeEach(function () {
	ProfilePageHelper.login();
    ProfilePageHelper.openProfilePage();
});

describe("Profile page tests", () => {
    it("C125216: Assign to 1 location", () => {
        ProfilePageHelper.clickAssignButton(0);
        ProfilePageHelper.assignUserToLocation(1);
        ProfilePageHelper.locationVisibilityAssertion()
    })

    it("C125217: Assign to 2 location", () => {
        ProfilePageHelper.clickAssignButton(1);
        ProfilePageHelper.assignUserToLocation(2);
        ProfilePageHelper.locationVisibilityAssertion();
        ProfilePageHelper.unassignUserToLocation();
        ProfilePageHelper.addLocationButtonAssertion();
    })

    it("C125218: Upload avatar", () => {
        ProfilePageHelper.uploadFile(ProfilePageHelper.avatarPath)
    })

    it("C125223 Mark as primary", () => {
        ProfilePageHelper.makeLocationAsPrimary()
        ProfilePageHelper.unmarkPrimaryAssertion()
    })

    it("C125224 Unmark as primary", () => {
        ProfilePageHelper.unmarkLocationAsPrimary()
        ProfilePageHelper.makePrimaryAssertion()
    })

    it("C125222: Unassign location", () => {
        ProfilePageHelper.unassignUserToLocation()
        ProfilePageHelper.addLocationButtonAssertion();
    })
})