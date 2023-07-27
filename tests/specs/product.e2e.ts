// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'ProductPag... Remove this comment to see the full error message
const ProductPage = require("../pageobjects/product.page");
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'ProductsPa... Remove this comment to see the full error message
const ProductsPage = require("../pageobjects/products.page");
describe("Single product page", () => {
    beforeEach(async () => {
        // @ts-expect-error TS(2304): Cannot find name 'browser'.
        // eslint-disable-next-line no-undef
        await browser.setWindowSize(935, 730);
        await ProductPage.open();
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        // eslint-disable-next-line no-undef
        expect(browser).toHaveUrl("http://localhost:3000/product/1")
    })
    it(" Adds to cart product", async () => {
        let countBefore = await ProductsPage.productsInCartCount.getHTML(false);
        await ProductPage.addToCart();
        // @ts-expect-error TS(2304): Cannot find name 'browser'.
        // eslint-disable-next-line no-undef
        await browser.pause(2000);
        let countAfter = await ProductsPage.productsInCartCount.getHTML(false);
        expect(countBefore + 1).toEqual(countAfter);
    })
    it(" Returns to products page", async () => {
        await ProductPage.goToProducts();
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        // eslint-disable-next-line no-undef
        expect(browser).toHaveUrl("http://localhost:3000/products/1");
    })
    it(" Returns to home page", async () => {
        await ProductPage.goToHome();
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        // eslint-disable-next-line no-undef
        expect(browser).toHaveUrl("http://localhost:3000/");
    })
})