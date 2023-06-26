// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'ProfilePag... Remove this comment to see the full error message
const ProfilePage = require( '../pageobjects/profile.page');
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'AuthPage'.
const AuthPage = require( '../pageobjects/auth.page');

//todo : complete changeablitity of error-feedback depending on input values

describe("Login process", () => {
  beforeEach(async () => {
    // @ts-expect-error TS(2304): Cannot find name 'browser'.
    // eslint-disable-next-line no-undef
    await browser.setWindowSize(935, 730);
    await AuthPage.open();
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    // eslint-disable-next-line no-undef
    expect(browser).toHaveUrl("http://localhost:3000/")
    await AuthPage.showLoginForm();
  })
  it(" Correct login desktop", async () => {
    expect(AuthPage.loginForm.isDisplayedInViewport()).toBeTruthy();
    await AuthPage.completeLoginForm("kminchelle", "0lelplR");
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(AuthPage.loginForm.isDisplayedInViewport()).not.toBe();
  });
  it(" Show error text on putting short data in login form on desktop", async () => {
    await AuthPage.inputUsername.setValue("ab");
    expect(AuthPage.loginForm.$('input[id="formBasicUsername"] ~ div[data-testid="error-feedback"]').isDisplayedInViewport()).toBeTruthy();
    await AuthPage.inputPassword.setValue("09");
    expect(AuthPage.loginForm.$('input[id="formBasicPassword"] ~ div[data-testid="error-feedback"]').isDisplayedInViewport()).toBeTruthy();
    expect(AuthPage.loginForm.isDisplayedInViewport()).toBeTruthy();
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    // eslint-disable-next-line no-undef
    expect(browser).toHaveUrl("http://localhost:3000/")
  });
  it(" Show error text on putting incorrect data in login form on desktop", async () => {
    await AuthPage.completeLoginForm("kminchelle", "qwerty123");
    expect(AuthPage.loginForm.$('h6[data-testid="auth-error-feedback"]').isDisplayedInViewport()).toBeTruthy();
    expect(AuthPage.loginForm.isDisplayedInViewport()).toBeTruthy();
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    // eslint-disable-next-line no-undef
    expect(browser).toHaveUrl("http://localhost:3000/")
  });

});

describe("Register process", () => {
  beforeEach(async () => {
    // @ts-expect-error TS(2304): Cannot find name 'browser'.
    // eslint-disable-next-line no-undef
    await browser.setWindowSize(935, 730);
    await AuthPage.open();
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    // eslint-disable-next-line no-undef
    expect(browser).toHaveUrl("http://localhost:3000/")
    await AuthPage.showRegisterForm();
  })
  it(" Register new user on desktop", async () => {
    expect(AuthPage.registerForm.isDisplayedInViewport()).toBeTruthy();
    await AuthPage.completeRegisterForm("asdfgh", "asdf@ghj.com", "zxcvbn", true);
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    // eslint-disable-next-line no-undef
    expect(browser).toHaveUrl("http://localhost:3000/profile")
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(AuthPage.registerForm.isDisplayedInViewport()).not.toBe();
    await ProfilePage.logout();
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    // eslint-disable-next-line no-undef
    expect(browser).toHaveUrl("http://localhost:3000/")
  });
  it(" Show error on incorrect email data in register form on desktop", async () => {
    await AuthPage.inputUsername.setValue("asdfgh");
    await AuthPage.inputEmail.setValue("asdf@ghj");
    expect(AuthPage.registerForm.$("input[id=\"formBasicEmail\"] ~ div[data-testid=\"error-feedback\"]").isDisplayedInViewport()).toBeTruthy();
    await AuthPage.inputPassword.setValue("zxcvbn");
    await AuthPage.checkboxAgreeTermsAndConditions.click();
    await AuthPage.submitButton.click();
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    // eslint-disable-next-line no-undef
    expect(browser).toHaveUrl("http://localhost:3000/");
  });
  it(" Show error on not checking checkbox 'agree terms and conditions' in register form on desktop", async () => {
    await AuthPage.completeRegisterForm("asdfgh", "asdf@ghj.com", "zxcvbn", false);
    expect(AuthPage.checkboxAgreeTermsAndConditions.$("~ div[class=\"invalid-feedback\"]").isDisplayedInViewport()).toBeTruthy();
    // @ts-expect-error TS(2304): Cannot find name 'browser'.
    // eslint-disable-next-line no-undef
    await browser.$("button[data-testid='submit-button']").click()
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(AuthPage.checkboxAgreeTermsAndConditions.$("~ div[class=\"invalid-feedback\"]").isDisplayedInViewport()).not.toBe();
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    // eslint-disable-next-line no-undef
    expect(browser).toHaveUrl("http://localhost:3000/")
  });
})
