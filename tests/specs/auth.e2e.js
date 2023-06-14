const ProfilePage = require( '../pageobjects/profile.page');
const AuthPage = require( '../pageobjects/auth.page');

//todo : complete changeablitity of error-feedback depending on input values

describe("Login process", () => {
  beforeEach(async () => {
    await browser.setWindowSize(935, 730);
    await AuthPage.open();
    await expect(browser).toHaveUrl("http://localhost:3000/")
    await AuthPage.showLoginForm();
  })
  it(" Correct login desktop", async () => {
    await expect(AuthPage.loginForm.isDisplayedInViewport()).toBeTruthy();
    await AuthPage.completeLoginForm("kminchelle", "0lelplR");
    // await expect(browser).toHaveUrl("http://localhost:3000/profile")
    await expect(AuthPage.loginForm.isDisplayedInViewport()).not.toBe();
  });
  it(" Show error text on putting short data in login form on desktop", async () => {
    await AuthPage.inputUsername.setValue("ab");
    await expect(AuthPage.loginForm.$('input[id="formBasicUsername"] ~ div[data-testid="error-feedback"]').isDisplayedInViewport()).toBeTruthy();
    await AuthPage.inputPassword.setValue("09");
    await expect(AuthPage.loginForm.$('input[id="formBasicPassword"] ~ div[data-testid="error-feedback"]').isDisplayedInViewport()).toBeTruthy();
    await expect(AuthPage.loginForm.isDisplayedInViewport()).toBeTruthy();
    await expect(browser).toHaveUrl("http://localhost:3000/")
  });
  it(" Show error text on putting incorrect data in login form on desktop", async () => {
    await AuthPage.completeLoginForm("kminchelle", "qwerty123");
    await expect(AuthPage.loginForm.$('h6[data-testid="auth-error-feedback"]').isDisplayedInViewport()).toBeTruthy();
    await expect(AuthPage.loginForm.isDisplayedInViewport()).toBeTruthy();
    await expect(browser).toHaveUrl("http://localhost:3000/")
  });

});

describe("Register process", () => {
  beforeEach(async () => {
    await browser.setWindowSize(935, 730);
    await AuthPage.open();
    await expect(browser).toHaveUrl("http://localhost:3000/")
    await AuthPage.showRegisterForm();
  })
  it(" Register new user on desktop", async () => {
    await expect(AuthPage.registerForm.isDisplayedInViewport()).toBeTruthy();
    await AuthPage.completeRegisterForm("asdfgh", "asdf@ghj.com", "zxcvbn", true);
    await expect(browser).toHaveUrl("http://localhost:3000/profile")
    await expect(AuthPage.registerForm.isDisplayedInViewport()).not.toBe();
    await ProfilePage.logout();
    await expect(browser).toHaveUrl("http://localhost:3000/")
  });
  it(" Show error on incorrect email data in register form on desktop", async () => {
    await AuthPage.inputUsername.setValue("asdfgh");
    await AuthPage.inputEmail.setValue("asdf@ghj");
    await expect(AuthPage.registerForm.$("input[id=\"formBasicEmail\"] ~ div[data-testid=\"error-feedback\"]").isDisplayedInViewport()).toBeTruthy();
    await AuthPage.inputPassword.setValue("zxcvbn");
    await AuthPage.checkboxAgreeTermsAndConditions.click();
    await AuthPage.submitButton.click();
    await expect(browser).toHaveUrl("http://localhost:3000/");
  });
  it(" Show error on not checking checkbox 'agree terms and conditions' in register form on desktop", async () => {
    await AuthPage.completeRegisterForm("asdfgh", "asdf@ghj.com", "zxcvbn", false);
    await expect(AuthPage.checkboxAgreeTermsAndConditions.$("~ div[class=\"invalid-feedback\"]").isDisplayedInViewport()).toBeTruthy();
    await browser.$("button[data-testid='submit-button']").click()
    await expect(AuthPage.checkboxAgreeTermsAndConditions.$("~ div[class=\"invalid-feedback\"]").isDisplayedInViewport()).not.toBe();
    await expect(browser).toHaveUrl("http://localhost:3000/")
  });
})
