
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'Page'.
const Page = require('./page');

/**
 * sub-page containing specific selectors and methods for a specific page
 */
class AuthPage extends Page {
    /**
     * define selectors using getter methods
     */
    get menuButtonMobile () {
        // @ts-expect-error TS(2581): Cannot find name '$'. Do you need to install type ... Remove this comment to see the full error message
        // eslint-disable-next-line no-undef
        return $("button[data-testid='menu-btn-mobile']");
    }

    get loginButtonMobile () {
        // @ts-expect-error TS(2581): Cannot find name '$'. Do you need to install type ... Remove this comment to see the full error message
        // eslint-disable-next-line no-undef
        return $("button[data-testid='login-btn-mobile']");
    }

    get registerButtonMobile () {
        // @ts-expect-error TS(2581): Cannot find name '$'. Do you need to install type ... Remove this comment to see the full error message
        // eslint-disable-next-line no-undef
        return $("button[data-testid='register-btn-mobile']");
    }

    get loginButtonDesktop () {
        // @ts-expect-error TS(2581): Cannot find name '$'. Do you need to install type ... Remove this comment to see the full error message
        // eslint-disable-next-line no-undef
        return $("button[data-testid='login-btn-desktop']");
    }

    get registerButtonDesktop () {
        // @ts-expect-error TS(2581): Cannot find name '$'. Do you need to install type ... Remove this comment to see the full error message
        // eslint-disable-next-line no-undef
        return $("button[data-testid='register-btn-desktop']");
    }

    get loginForm () {
        // @ts-expect-error TS(2581): Cannot find name '$'. Do you need to install type ... Remove this comment to see the full error message
        // eslint-disable-next-line no-undef
        return $("form[data-testid=\"login-form\"]");
    }

    get registerForm () {
        // @ts-expect-error TS(2581): Cannot find name '$'. Do you need to install type ... Remove this comment to see the full error message
        // eslint-disable-next-line no-undef
        return $("form[data-testid='register-form']");
    }

    get inputUsername () {
        // @ts-expect-error TS(2581): Cannot find name '$'. Do you need to install type ... Remove this comment to see the full error message
        // eslint-disable-next-line no-undef
        return $("#formBasicUsername");
    }

    get inputEmail () {
        // @ts-expect-error TS(2581): Cannot find name '$'. Do you need to install type ... Remove this comment to see the full error message
        // eslint-disable-next-line no-undef
        return $("#formBasicEmail");
    }

    get inputPassword () {
        // @ts-expect-error TS(2581): Cannot find name '$'. Do you need to install type ... Remove this comment to see the full error message
        // eslint-disable-next-line no-undef
        return $("#formBasicPassword");
    }

    get checkboxAgreeTermsAndConditions () {
        // @ts-expect-error TS(2581): Cannot find name '$'. Do you need to install type ... Remove this comment to see the full error message
        // eslint-disable-next-line no-undef
        return $("input[data-testid=\"checkbox-agree-terms-and-conditions\"]");
    }

    get submitButton () {
        // @ts-expect-error TS(2581): Cannot find name '$'. Do you need to install type ... Remove this comment to see the full error message
        // eslint-disable-next-line no-undef
        return $("button[data-testid='submit-button']");
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    async showBurgerMenu (isStrict = true) {
        if (await this.menuButtonMobile.isDisplayed()) {
            await this.menuButtonMobile.click();
        } else if (isStrict && !await this.menuButtonMobile.isDisplayed()) {
            throw  Error('No clickable menu button');
        } else {
            console.log('No any clickable burger menu')
        }
    }

    async showLoginForm () {
        if (await this.loginButtonMobile.isDisplayed()) {
            await this.loginButtonMobile.click();
        } else if (await this.loginButtonDesktop.isDisplayed()){
            await this.loginButtonDesktop.click();
        } else {
            throw Error('No any clickable login button');
        }
    }

    async showRegisterForm() {
        if (await this.registerButtonMobile.isDisplayed()) {
            await this.registerButtonMobile.click();
        } else if (await this.registerButtonDesktop.isDisplayed()) {
            await this.registerButtonDesktop.click();
        } else {
            throw new Error('No any clickable register button')
        }
    }

    async fillDataLogin(username: any, password: any) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
    }

    async fillDataRegister(username: any, email: any, password: any, isCheck: any){
        await this.inputUsername.setValue(username);
        await this.inputEmail.setValue(email);
        await this.inputPassword.setValue(password);
        (await isCheck) && (await this.checkboxAgreeTermsAndConditions.click());
    }

    async completeLoginForm (username = "kminchelle", password = "0lelplR") {
        await this.fillDataLogin(username, password);
        await this.submitButton.click();
    }

    async login (username = "kminchelle", password = "0lelplR") {
        await this.showBurgerMenu(false);
        await this.showLoginForm();
        await this.completeLoginForm(username, password);
    }

    async completeRegisterForm (username = "asdfgh", email = "asdfgh@asdf.com", password = "asdfgh", isCheck = true) {
        await this.fillDataRegister(username, email, password, isCheck);
        await this.submitButton.click();
    }

    async register (username = "asdfgh", email = "asdfgh@asdf.com", password = "asdfgh", isCheck = true) {
        await this.showRegisterForm();
        // @ts-expect-error TS(2554): Expected 0-2 arguments, but got 4.
        await this.completeLoginForm(username, email, password, isCheck);
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    open () {
        return super.open('');
    }
}

module.exports = new AuthPage();
