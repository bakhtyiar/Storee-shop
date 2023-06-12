const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class ProfilePage extends Page {
    /**
     * define selectors using getter methods
     */
    get notLoggedInArticle () {
        return $("div[data-testid=\"error-no-personal-profile-page\"]");
    }

    get buttonEditProfile () {
        return $("button[ data-testid='edit-profile-btn']");
    }

    get inputFirstName () {
        return $("input#formBasicName");
    }

    get spanFirstName () {
        return $("span[data-testid='firstname-data']");
    }

    get inputSurName () {
        return $("input#formBasicSurname");
    }

    get spanSurName () {
        return $("span[data-testid='surname-data']");
    }

    get logoutButton () {
        return $("button[data-testid='btn-logout-profile']");
    }

    get cancelEditingButton () {
        return $("button[ data-testid='cancel-editing-btn']");
    }

    get saveChangesButton () {
        return $("button[data-testid=\"save-changes-btn\"]");
    }
    get confirmChangesButton () {
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
        await browser.deleteAllCookies();
    }

    open () {
        return super.open('/profile');
    }
}

module.exports = new ProfilePage();
