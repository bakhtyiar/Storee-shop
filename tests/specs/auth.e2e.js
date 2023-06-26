const ProfilePage = require( '../pageobjects/profile.page');
const AuthPage = require( '../pageobjects/auth.page');

//todo : complete changeablitity of error-feedback depending on input values

describe("Login process", () => {
  beforeEach(async () => {
    // eslint-disable-next-line no-undef
    await browser.setWindowSize(935, 730);
    await AuthPage.open();
    // eslint-disable-next-line no-undef
    expect(browser).toHaveUrl("http://localhost:3000/")
    await AuthPage.showLoginForm();
  })
  it(" Correct login desktop", async () => {
    expect(AuthPage.loginForm.isDisplayedInViewport()).toBeTruthy();
    await AuthPage.completeLoginForm("kminchelle", "0lelplR");
    expect(AuthPage.loginForm.isDisplayedInViewport()).not.toBe();
  });
  it(" Show error text on putting short data in login form on desktop", async () => {
    await AuthPage.inputUsername.setValue("ab");
    expect(AuthPage.loginForm.$('input[id="formBasicUsername"] ~ div[data-testid="error-feedback"]').isDisplayedInViewport()).toBeTruthy();
    await AuthPage.inputPassword.setValue("09");
    expect(AuthPage.loginForm.$('input[id="formBasicPassword"] ~ div[data-testid="error-feedback"]').isDisplayedInViewport()).toBeTruthy();
    expect(AuthPage.loginForm.isDisplayedInViewport()).toBeTruthy();
    // eslint-disable-next-line no-undef
    expect(browser).toHaveUrl("http://localhost:3000/")
  });
  it(" Show error text on putting incorrect data in login form on desktop", async () => {
    await AuthPage.completeLoginForm("kminchelle", "qwerty123");
    expect(AuthPage.loginForm.$('h6[data-testid="auth-error-feedback"]').isDisplayedInViewport()).toBeTruthy();
    expect(AuthPage.loginForm.isDisplayedInViewport()).toBeTruthy();
    // eslint-disable-next-line no-undef
    expect(browser).toHaveUrl("http://localhost:3000/")
  });

});

describe("Register process", () => {
  beforeEach(async () => {
    // eslint-disable-next-line no-undef
    await browser.setWindowSize(935, 730);
    await AuthPage.open();
    // eslint-disable-next-line no-undef
    expect(browser).toHaveUrl("http://localhost:3000/")
    await AuthPage.showRegisterForm();
  })
  it(" Register new user on desktop", async () => {
    expect(AuthPage.registerForm.isDisplayedInViewport()).toBeTruthy();
    await AuthPage.completeRegisterForm("asdfgh", "asdf@ghj.com", "zxcvbn", true);
    // eslint-disable-next-line no-undef
    expect(browser).toHaveUrl("http://localhost:3000/profile")
    expect(AuthPage.registerForm.isDisplayedInViewport()).not.toBe();
    await ProfilePage.logout();
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
    // eslint-disable-next-line no-undef
    expect(browser).toHaveUrl("http://localhost:3000/");
  });
  it(" Show error on not checking checkbox 'agree terms and conditions' in register form on desktop", async () => {
    await AuthPage.completeRegisterForm("asdfgh", "asdf@ghj.com", "zxcvbn", false);
    expect(AuthPage.checkboxAgreeTermsAndConditions.$("~ div[class=\"invalid-feedback\"]").isDisplayedInViewport()).toBeTruthy();
    // eslint-disable-next-line no-undef
    await browser.$("button[data-testid='submit-button']").click()
    expect(AuthPage.checkboxAgreeTermsAndConditions.$("~ div[class=\"invalid-feedback\"]").isDisplayedInViewport()).not.toBe();
    // eslint-disable-next-line no-undef
    expect(browser).toHaveUrl("http://localhost:3000/")
  });
})
