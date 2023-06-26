// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'ProfilePag... Remove this comment to see the full error message
const ProfilePage = require( '../pageobjects/profile.page');
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'AuthPage'.
const AuthPage = require( '../pageobjects/auth.page');

// @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("Personal profile page interactions", () => {
  // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
  beforeEach(async () => {
    // @ts-expect-error TS(2304): Cannot find name 'browser'.
    // eslint-disable-next-line no-undef
    await browser.setWindowSize(935, 730);
    // @ts-expect-error TS(2339): Property 'open' does not exist on type 'typeof Aut... Remove this comment to see the full error message
    await AuthPage.open();
    // @ts-expect-error TS(2339): Property 'login' does not exist on type 'typeof Au... Remove this comment to see the full error message
    await AuthPage.login();
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(ProfilePage.notLoggedInArticle).not.toBe();
  })
  // @ts-expect-error TS(2304): Cannot find name 'afterEach'.
  afterEach(async () => {
    // @ts-expect-error TS(2304): Cannot find name 'browser'.
    // eslint-disable-next-line no-undef
    await browser.deleteAllCookies();
  })

  // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it(" Logout", async () => {
    // @ts-expect-error TS(2339): Property 'logout' does not exist on type 'typeof P... Remove this comment to see the full error message
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
  // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it(" Edit profile data", async () => {
    // @ts-expect-error TS(2339): Property 'spanFirstName' does not exist on type 't... Remove this comment to see the full error message
    let firstNameBeforeEdit = await ProfilePage.spanFirstName.getText();
    // @ts-expect-error TS(2339): Property 'startEditingProfile' does not exist on t... Remove this comment to see the full error message
    await ProfilePage.startEditingProfile();
    // @ts-expect-error TS(2339): Property 'inputFirstName' does not exist on type '... Remove this comment to see the full error message
    await ProfilePage.inputFirstName.addValue("123");
    // @ts-expect-error TS(2339): Property 'inputSurName' does not exist on type 'ty... Remove this comment to see the full error message
    await ProfilePage.inputSurName.click();
    // @ts-expect-error TS(2339): Property 'commitChanges' does not exist on type 't... Remove this comment to see the full error message
    await ProfilePage.commitChanges();
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(await ProfilePage.spanFirstName.getText()).toEqual(firstNameBeforeEdit + '123');
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    // eslint-disable-next-line no-undef
    expect(browser).toHaveUrl("http://localhost:3000/profile");
  })
  // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it(" Cancel editing", async () => {
    // @ts-expect-error TS(2339): Property 'spanFirstName' does not exist on type 't... Remove this comment to see the full error message
    let firstNameBeforeEdit = await ProfilePage.spanFirstName.getText();
    // @ts-expect-error TS(2339): Property 'spanSurName' does not exist on type 'typ... Remove this comment to see the full error message
    let surNameBeforeEdit = await ProfilePage.spanSurName.getText();
    // @ts-expect-error TS(2339): Property 'startEditingProfile' does not exist on t... Remove this comment to see the full error message
    await ProfilePage.startEditingProfile();
    // @ts-expect-error TS(2339): Property 'inputFirstName' does not exist on type '... Remove this comment to see the full error message
    await ProfilePage.inputFirstName.addValue("123");
    // @ts-expect-error TS(2339): Property 'inputSurName' does not exist on type 'ty... Remove this comment to see the full error message
    await ProfilePage.inputSurName.click();
    // @ts-expect-error TS(2339): Property 'cancelEditing' does not exist on type 't... Remove this comment to see the full error message
    await ProfilePage.cancelEditing();
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(await ProfilePage.spanFirstName.getText()).toEqual(firstNameBeforeEdit);
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(await ProfilePage.spanSurName.getText()).toEqual(surNameBeforeEdit);
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    // eslint-disable-next-line no-undef
    expect(browser).toHaveUrl("http://localhost:3000/profile");
  })
});
