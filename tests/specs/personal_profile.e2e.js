const ProfilePage = require( '../pageobjects/profile.page');
const AuthPage = require( '../pageobjects/auth.page');

describe("Personal profile page interactions", () => {
  beforeEach(async () => {
    await browser.setWindowSize(935, 730);
    await AuthPage.open();
    await AuthPage.login();
    await expect(ProfilePage.notLoggedInArticle).not.toBe();
  })
  afterEach(async () => {
    await browser.deleteAllCookies();
  })

  it(" Logout", async () => {
    await ProfilePage.logout();
    await expect(browser).toHaveUrl("http://localhost:3000/")
    await expect(browser.getCookies('userKey')).not.toBe();
    await expect(browser.getCookies('authKey')).not.toBe();
  });
  it(" Edit profile data", async () => {
    let firstNameBeforeEdit = await ProfilePage.spanFirstName.getText();
    await ProfilePage.startEditingProfile();
    await ProfilePage.inputFirstName.addValue("123");
    await ProfilePage.inputSurName.click();
    await ProfilePage.commitChanges();
    await expect(await ProfilePage.spanFirstName.getText()).toEqual(firstNameBeforeEdit + '123');
    await expect(browser).toHaveUrl("http://localhost:3000/profile");
  })
  it(" Cancel editing", async () => {
    let firstNameBeforeEdit = await ProfilePage.spanFirstName.getText();
    let surNameBeforeEdit = await ProfilePage.spanSurName.getText();
    await ProfilePage.startEditingProfile();
    await ProfilePage.inputFirstName.addValue("123");
    await ProfilePage.inputSurName.click();
    await ProfilePage.cancelEditing();
    await expect(await ProfilePage.spanFirstName.getText()).toEqual(firstNameBeforeEdit);
    await expect(await ProfilePage.spanSurName.getText()).toEqual(surNameBeforeEdit);
    await expect(browser).toHaveUrl("http://localhost:3000/profile");
  })
});
