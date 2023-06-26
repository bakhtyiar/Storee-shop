const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class ProfilePage extends Page {
    /**
     * define selectors using getter methods
     */
    get notLoggedInArticle () {
        // eslint-disable-next-line no-undef
        return $("div[data-testid=\"error-no-personal-profile-page\"]");
    }

    get buttonEditProfile () {
        // eslint-disable-next-line no-undef
        return $("button[ data-testid='edit-profile-btn']");
    }

    get inputFirstName () {
        // eslint-disable-next-line no-undef
        return $("input#formBasicName");
    }

    get spanFirstName () {
        // eslint-disable-next-line no-undef
        return $("span[data-testid='firstname-data']");
    }

    get inputSurName () {
        // eslint-disable-next-line no-undef
        return $("input#formBasicSurname");
    }

    get spanSurName () {
        // eslint-disable-next-line no-undef
        return $("span[data-testid='surname-data']");
    }

    get logoutButton () {
        // eslint-disable-next-line no-undef
        return $("button[data-testid='btn-logout-profile']");
    }

    get cancelEditingButton () {
        // eslint-disable-next-line no-undef
        return $("button[ data-testid='cancel-editing-btn']");
    }

    get saveChangesButton () {
        // eslint-disable-next-line no-undef
        return $("button[data-testid=\"save-changes-btn\"]");
    }
    get confirmChangesButton () {
        // eslint-disable-next-line no-undef
        return $("button[data-testid=\"confirm-changes-btn\"]");
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    async startEditingProfile () {
        await this.buttonEditProfile.click();
    }

    async logout () {
        await this.logoutButton.click();
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    async commitChanges () {
        await this.saveChangesButton.click();
        await this.confirmChangesButton.click();
    }

    async cancelEditing () {
        await this.cancelEditingButton.click();
    }

    async clearCookies () {
        // eslint-disable-next-line no-undef
        await browser.deleteAllCookies();
    }

    open () {
        return super.open('/profile');
    }
}

module.exports = new ProfilePage();
