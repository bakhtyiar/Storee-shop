// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'Page'.
const Page = require('./page');

// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'ProductPag... Remove this comment to see the full error message
class ProductPage extends Page {

    get homeBreadCrumb() {
        // @ts-expect-error TS(2581): Cannot find name '$'. Do you need to install type ... Remove this comment to see the full error message
        // eslint-disable-next-line no-undef
        return $("li[data-testid='breadcrumb-home']")
    }
    get productsBreadCrumb() {
        // @ts-expect-error TS(2581): Cannot find name '$'. Do you need to install type ... Remove this comment to see the full error message
        // eslint-disable-next-line no-undef
        return $("li[data-testid='breadcrumb-products']")
    }

    get addToCardButton() {
        // @ts-expect-error TS(2581): Cannot find name '$'. Do you need to install type ... Remove this comment to see the full error message
        // eslint-disable-next-line no-undef
        return $("button[data-testid='add-to-cart-button']")
    }

    async goToHome() {
        await this.homeBreadCrumb.click();
    }

    async goToProducts() {
        await this.productsBreadCrumb.click();
    }

    async addToCart() {
        await this.addToCardButton.click();
    }

    open () {
        return super.open("product/1");
    }
}

// @ts-expect-error TS(2580): Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = new ProductPage();