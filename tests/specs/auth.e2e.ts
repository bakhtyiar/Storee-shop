import {setRelevantScreen} from "../integration-helpers/screenSetters";
import {runsData, TestIteration} from "../runs";
import {browser} from "@wdio/globals";

const ProfilePage = require('../pageobjects/profile.page');
const AuthPage = require('../pageobjects/auth.page');

//todo : complete changeablitity of error-feedback depending on input values

runsData.forEach((run: TestIteration) => {
    // describe(`Login process ${run.it}`, () => {
    //     beforeEach(async () => {
    //         await setRelevantScreen(run);
    //         await AuthPage.open();
    //         await AuthPage.showBurgerMenu(false);
    //         await browser.pause(1100);
    //         await AuthPage.showLoginForm();
    //     })
    //     it(" Correct login", async () => {
    //         expect(AuthPage.loginForm.isDisplayedInViewport()).toBeTruthy();
    //         await AuthPage.completeLoginForm("kminchelle", "0lelplR");
    //         // @ts-expect-error TS(2304): Cannot find name 'expect'.
    //         expect(AuthPage.loginForm.isDisplayedInViewport()).not.toBe();
    //     });
    //     it(" Show error text on putting short data in login form", async () => {
    //         await AuthPage.inputUsername.setValue("ab");
    //         expect(AuthPage.loginForm.$('input[id="formBasicUsername"] ~ div[data-testid="error-feedback"]').isDisplayedInViewport()).toBeTruthy();
    //         await AuthPage.inputPassword.setValue("09");
    //         expect(AuthPage.loginForm.$('input[id="formBasicPassword"] ~ div[data-testid="error-feedback"]').isDisplayedInViewport()).toBeTruthy();
    //         expect(AuthPage.loginForm.isDisplayedInViewport()).toBeTruthy();
    //         // @ts-expect-error TS(2304): Cannot find name 'expect'.
    //         // eslint-disable-next-line no-undef
    //         expect(browser).toHaveUrl("http://localhost:3000/")
    //     });
    //     it(" Show error text on putting incorrect data in login form", async () => {
    //         await AuthPage.completeLoginForm("kminchelle", "qwerty123");
    //         expect(AuthPage.loginForm.$('h6[data-testid="auth-error-feedback"]').isDisplayedInViewport()).toBeTruthy();
    //         expect(AuthPage.loginForm.isDisplayedInViewport()).toBeTruthy();
    //         // @ts-expect-error TS(2304): Cannot find name 'expect'.
    //         // eslint-disable-next-line no-undef
    //         expect(browser).toHaveUrl("http://localhost:3000/")
    //     });
    //
    // });

    describe(`Register process ${run.it}`, () => {
        beforeEach(async () => {
            await setRelevantScreen(run);
            await AuthPage.open();
            await browser.deleteCookie('user');
            await browser.deleteCookie('auth-token');
            await AuthPage.showBurgerMenu(false);
            await AuthPage.showRegisterForm();
        })
        afterEach(async () => {
            await browser.deleteCookie('user');
            await browser.deleteCookie('auth-token');
        })
        it(" Register new user", async () => {
            expect(AuthPage.registerForm.isDisplayedInViewport()).toBeTruthy();
            await AuthPage.completeRegisterForm("asdfgh", "asdf@ghj.com", "zxcvbn", true);
            expect(browser).toHaveUrl("http://localhost:3000/profile")
            // @ts-expect-error TS(2304): Cannot find name 'expect'.
            expect(AuthPage.registerForm.isDisplayed()).not.toBe();
            await ProfilePage.logoutButton.waitForDisplayed();
            await ProfilePage.logout();
            await browser.pause(2000);
            expect(browser).toHaveUrl("http://localhost:3000/")
        });
        it(" Show error on incorrect email data in register form", async () => {
            await AuthPage.inputUsername.setValue("asdfgh");
            await AuthPage.inputEmail.setValue("asdf@ghj");
            expect(AuthPage.registerForm.$("input[id=\"formBasicEmail\"] ~ div[data-testid=\"error-feedback\"]").isDisplayedInViewport()).toBeTruthy();
            await AuthPage.inputPassword.setValue("zxcvbn");
            await AuthPage.checkboxAgreeTermsAndConditions.click();
            await AuthPage.submitButton.click();
            expect(browser).toHaveUrl("http://localhost:3000/");
        });
        it(" Show error on not checking checkbox 'agree terms and conditions' in register form", async () => {
            await AuthPage.completeRegisterForm("asdfgh", "asdf@ghj.com", "zxcvbn", false);
            expect(AuthPage.checkboxAgreeTermsAndConditions.$("~ div[class=\"invalid-feedback\"]").isDisplayedInViewport()).toBeTruthy();
            await browser.$("button[data-testid='submit-button']").click()
            // @ts-expect-error TS(2304): Cannot find name 'expect'.
            expect(AuthPage.checkboxAgreeTermsAndConditions.$("~ div[class=\"invalid-feedback\"]").isDisplayedInViewport()).not.toBe();
            expect(browser).toHaveUrl("http://localhost:3000/")
        });
    })
})