// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'Page'.
const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'ProfilePag... Remove this comment to see the full error message
class ProfilePage extends Page {
    /**
     * define selectors using getter methods
     */
    get notLoggedInArticle () {
        // @ts-expect-error TS(2581): Cannot find name '$'. Do you need to install type ... Remove this comment to see the full error message
        // eslint-disable-next-line no-undef
        return $("div[data-testid=\"error-no-personal-profile-page\"]");
    }

    get buttonEditProfile () {
        // @ts-expect-error TS(2581): Cannot find name '$'. Do you need to install type ... Remove this comment to see the full error message
        // eslint-disable-next-line no-undef
        return $("button[ data-testid='edit-profile-btn']");
    }

    get inputFirstName () {
        // @ts-expect-error TS(2581): Cannot find name '$'. Do you need to install type ... Remove this comment to see the full error message
        // eslint-disable-next-line no-undef
        return $("input#formBasicName");
    }

    get spanFirstName () {
        // @ts-expect-error TS(2581): Cannot find name '$'. Do you need to install type ... Remove this comment to see the full error message
        // eslint-disable-next-line no-undef
        return $("span[data-testid='firstname-data']");
    }

    get inputSurName () {
        // @ts-expect-error TS(2581): Cannot find name '$'. Do you need to install type ... Remove this comment to see the full error message
        // eslint-disable-next-line no-undef
        return $("input#formBasicSurname");
    }

    get spanSurName () {
        // @ts-expect-error TS(2581): Cannot find name '$'. Do you need to install type ... Remove this comment to see the full error message
        // eslint-disable-next-line no-undef
        return $("span[data-testid='surname-data']");
    }

    get logoutButton () {
        // @ts-expect-error TS(2581): Cannot find name '$'. Do you need to install type ... Remove this comment to see the full error message
        // eslint-disable-next-line no-undef
        return $("button[data-testid='btn-logout-profile']");
    }

    get cancelEditingButton () {
        // @ts-expect-error TS(2581): Cannot find name '$'. Do you need to install type ... Remove this comment to see the full error message
        // eslint-disable-next-line no-undef
        return $("button[ data-testid='cancel-editing-btn']");
    }

    get saveChangesButton () {
        // @ts-expect-error TS(2581): Cannot find name '$'. Do you need to install type ... Remove this comment to see the full error message
        // eslint-disable-next-line no-undef
        return $("button[data-testid=\"save-changes-btn\"]");
    }
    get confirmChangesButton () {
        // @ts-expect-error TS(2581): Cannot find name '$'. Do you need to install type ... Remove this comment to see the full error message
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
        // @ts-expect-error TS(2304): Cannot find name 'browser'.
        // eslint-disable-next-line no-undef
        await browser.deleteAllCookies();
    }

    open () {
        return super.open('/profile');
    }
}

// @ts-expect-error TS(2580): Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = new ProfilePage();
