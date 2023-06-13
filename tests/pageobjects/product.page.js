const Page = require('./page');

class ProductPage extends Page {

    get homeBreadCrumb() {
        return $("li[data-testid='breadcrumb-home']")
    }
    get productsBreadCrumb() {
        return $("li[data-testid='breadcrumb-products']")
    }

    get addToCardButton() {
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

module.exports = new ProductPage();