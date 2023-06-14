const ProfilePage = require( '../pageobjects/profile.page');
const AuthPage = require( '../pageobjects/auth.page');

describe("Personal profile page interactions", () => {
  beforeEach(async () => {
    await browser.setWindowSize(935, 730);
    await AuthPage.open();
    await AuthPage.login();
    expect(ProfilePage.notLoggedInArticle).not.toBe();
  })
  afterEach(async () => {
    await browser.deleteAllCookies();
  })

  it(" Logout", async () => {
    await ProfilePage.logout();
    expect(browser).toHaveUrl("http://localhost:3000/")
    expect(browser.getCookies('userKey')).not.toBe();
    expect(browser.getCookies('authKey')).not.toBe();
  });
  it(" Edit profile data", async () => {
    let firstNameBeforeEdit = await ProfilePage.spanFirstName.getText();
    await ProfilePage.startEditingProfile();
    await ProfilePage.inputFirstName.addValue("123");
    await ProfilePage.inputSurName.click();
    await ProfilePage.commitChanges();
    expect(await ProfilePage.spanFirstName.getText()).toEqual(firstNameBeforeEdit + '123');
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
    expect(browser).toHaveUrl("http://localhost:3000/profile");
  })
});
