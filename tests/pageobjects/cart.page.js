const Page = require("./page");

class CartPage extends Page {

    get productsSection() {
        return $("div[data-testid=\"products-section\"]")
    }

    get plusQuantButtons() {
        return $$("button[data-testid=\"plus-btn\"]")
    }

    get minusQuantButtons() {
        return $$("button[data-testid=\"minus-btn\"]")
    }

    get quantityInputs() {
        return $$("input[data-testid=\"quantity-field\"]")
    }

    get productsLinks() {
        return $$("a[data-testid='product-link']")
    }

    get removeButtons() {
        return $$("button[data-testid=\"remove-btn\"]")
    }

    get makeOrderButton() {
        return $("a[data-testid='make-order-btn']")
    }


    open () {
        return super.open("cart");
    }
}

module.exports = new CartPage();
