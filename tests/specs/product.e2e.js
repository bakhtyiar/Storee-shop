const ProductPage = require("../pageobjects/product.page.js");
const ProductsPage = require("../pageobjects/products.page.js");
describe("Single product page", () => {
    beforeEach(async () => {
        await browser.setWindowSize(935, 730);
        await ProductPage.open();
        expect(browser).toHaveUrl("http://localhost:3000/product/1")
    })
    it(" Adds to cart product", async () => {
        let countBefore = await ProductsPage.productsInCartCount.getHTML(false);
        await ProductPage.addToCart();
        await browser.pause(2000);
        let countAfter = await ProductsPage.productsInCartCount.getHTML(false);
        expect(countBefore + 1).toEqual(countAfter);
    })
    it(" Returns to products page", async () => {
        await ProductPage.goToProducts();
        expect(browser).toHaveUrl("http://localhost:3000/products/1");
    })
    it(" Returns to home page", async () => {
        await ProductPage.goToHome();
        expect(browser).toHaveUrl("http://localhost:3000/");
    })
})