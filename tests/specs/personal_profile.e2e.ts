import {setRelevantScreen} from "../integration-helpers/screenSetters";
import {runsData, TestIteration} from "../runs";

const ProfilePage = require('../pageobjects/profile.page');
const AuthPage = require('../pageobjects/auth.page');

runsData.forEach((run: TestIteration) => {
    describe(`Personal profile page interactions ${run.it}`, () => {
        beforeEach(async () => {
            await setRelevantScreen(run);
            await AuthPage.open();
            await AuthPage.login();
            // @ts-expect-error TS(2304): Cannot find name 'expect'.
            expect(ProfilePage.notLoggedInArticle).not.toBe();
        })
        afterEach(async () => {
            // @ts-expect-error TS(2304): Cannot find name 'browser'.
            // eslint-disable-next-line no-undef
            await browser.deleteAllCookies();
        })

        it(" Logout", async () => {
            await ProfilePage.logoutButton.waitForDisplayed();
            await ProfilePage.logout();
            // @ts-expect-error TS(2304): Cannot find name 'expect'.
            // eslint-disable-next-line no-undef
            expect(browser).toHaveUrl("http://localhost:3000/")
            // @ts-expect-error TS(2304): Cannot find name 'expect'.
            // eslint-disable-next-line no-undef
            expect(browser.getCookies('userKey')).not.toBe();
            // @ts-expect-error TS(2304): Cannot find name 'expect'.
            // eslint-disable-next-line no-undef
            expect(browser.getCookies('authKey')).not.toBe();
        });
        it(" Edit profile data", async () => {
            let firstNameBeforeEdit = await ProfilePage.spanFirstName.getText();
            await ProfilePage.startEditingProfile();
            await ProfilePage.inputFirstName.addValue("123");
            await ProfilePage.inputSurName.click();
            await ProfilePage.commitChanges();
            expect(await ProfilePage.spanFirstName.getText()).toEqual(firstNameBeforeEdit + '123');
            // @ts-expect-error TS(2304): Cannot find name 'expect'.
            // eslint-disable-next-line no-undef
            expect(browser).toHaveUrl("http://localhost:3000/profile");
        })
        it(" Cancel editing", async () => {
            let firstNameBeforeEdit = await ProfilePage.spanFirstName.getText();
            let surNameBeforeEdit = await ProfilePage.spanSurName.getText();
            await ProfilePage.startEditingProfile();
            await ProfilePage.inputFirstName.addValue("123");
            await ProfilePage.inputSurName.click();
            await ProfilePage.cancelEditing();
            expect(await ProfilePage.spanFirstName.getText()).toEqual(firstNameBeforeEdit);
            expect(await ProfilePage.spanSurName.getText()).toEqual(surNameBeforeEdit);
            // @ts-expect-error TS(2304): Cannot find name 'expect'.
            // eslint-disable-next-line no-undef
            expect(browser).toHaveUrl("http://localhost:3000/profile");
        })
    })
})