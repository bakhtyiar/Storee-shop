
const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class AuthPage extends Page {
    /**
     * define selectors using getter methods
     */
    get loginButtonDesktop () {
        return $("button[data-testid='login-btn-desktop']");
    }

    get registerButtonDesktop () {
        return $("button[data-testid='register-btn-desktop']");
    }

    get loginForm () {
        return $("form[data-testid=\"login-form\"]");
    }

    get registerForm () {
        return $("form[data-testid='register-form']");
    }

    get inputUsername () {
        return $("#formBasicUsername");
    }

    get inputEmail () {
        return $("#formBasicEmail");
    }

    get inputPassword () {
        return $("#formBasicPassword");
    }

    get checkboxAgreeTermsAndConditions () {
        return $("input[data-testid=\"checkbox-agree-terms-and-conditions\"]");
    }

    get submitButton () {
        return $("button[data-testid='submit-button']");
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    async showLoginForm () {
        await this.loginButtonDesktop.click();
    }

    async showRegisterForm () {
        await this.registerButtonDesktop.click();
    }

    async fillDataLogin(username, password) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
    }

    async fillDataRegister(username, email, password, isCheck){
        await this.inputUsername.setValue(username);
        await this.inputEmail.setValue(email);
        await this.inputPassword.setValue(password);
        await isCheck && await this.checkboxAgreeTermsAndConditions.click();
    }

    async completeLoginForm (username = "kminchelle", password = "0lelplR") {
        await this.fillDataLogin(username, password);
        await this.submitButton.click();
    }

    async login (username = "kminchelle", password = "0lelplR") {
        await this.showLoginForm();
        await this.completeLoginForm(username, password);
    }

    async completeRegisterForm (username = "asdfgh", email = "asdfgh@asdf.com", password = "asdfgh", isCheck = true) {
        await this.fillDataRegister(username, email, password, isCheck);
        await this.submitButton.click();
    }

    async register (username = "asdfgh", email = "asdfgh@asdf.com", password = "asdfgh", isCheck = true) {
        await this.showRegisterForm();
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
