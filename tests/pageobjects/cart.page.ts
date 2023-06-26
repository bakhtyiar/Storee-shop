const Page = require("./page");

class CartPage extends Page {

    get productsSection() {
        // eslint-disable-next-line no-undef
        return $("div[data-testid=\"products-section\"]")
    }

    get plusQuantButtons() {
        // eslint-disable-next-line no-undef
        return $$("button[data-testid=\"plus-btn\"]")
    }

    get minusQuantButtons() {
        // eslint-disable-next-line no-undef
        return $$("button[data-testid=\"minus-btn\"]")
    }

    get quantityInputs() {
        // eslint-disable-next-line no-undef
        return $$("input[data-testid=\"quantity-field\"]")
    }

    get productsLinks() {
        // eslint-disable-next-line no-undef
        return $$("a[data-testid='product-link']")
    }

    get removeButtons() {
        // eslint-disable-next-line no-undef
        return $$("button[data-testid=\"remove-btn\"]")
    }

    get makeOrderButton() {
        // eslint-disable-next-line no-undef
        return $("a[data-testid='make-order-btn']")
    }


    open () {
        return super.open("cart");
    }
}

module.exports = new CartPage();
