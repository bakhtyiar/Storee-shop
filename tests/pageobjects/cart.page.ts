// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'Page'.
const Page = require("./page");

// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'CartPage'.
class CartPage extends Page {

    get productsSection() {
        // @ts-expect-error TS(2581): Cannot find name '$'. Do you need to install type ... Remove this comment to see the full error message
        // eslint-disable-next-line no-undef
        return $("div[data-testid=\"products-section\"]")
    }

    get plusQuantButtons() {
        // @ts-expect-error TS(2304): Cannot find name '$$'.
        // eslint-disable-next-line no-undef
        return $$("button[data-testid=\"plus-btn\"]")
    }

    get minusQuantButtons() {
        // @ts-expect-error TS(2304): Cannot find name '$$'.
        // eslint-disable-next-line no-undef
        return $$("button[data-testid=\"minus-btn\"]")
    }

    get quantityInputs() {
        // @ts-expect-error TS(2304): Cannot find name '$$'.
        // eslint-disable-next-line no-undef
        return $$("input[data-testid=\"quantity-field\"]")
    }

    get productsLinks() {
        // @ts-expect-error TS(2304): Cannot find name '$$'.
        // eslint-disable-next-line no-undef
        return $$("a[data-testid='product-link']")
    }

    get removeButtons() {
        // @ts-expect-error TS(2304): Cannot find name '$$'.
        // eslint-disable-next-line no-undef
        return $$("button[data-testid=\"remove-btn\"]")
    }

    get makeOrderButton() {
        // @ts-expect-error TS(2581): Cannot find name '$'. Do you need to install type ... Remove this comment to see the full error message
        // eslint-disable-next-line no-undef
        return $("a[data-testid='make-order-btn']")
    }


    open () {
        return super.open("cart");
    }
}

module.exports = new CartPage();
