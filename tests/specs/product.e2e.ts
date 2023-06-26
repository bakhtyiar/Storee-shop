// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'ProductPag... Remove this comment to see the full error message
const ProductPage = require("../pageobjects/product.page.js");
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'ProductsPa... Remove this comment to see the full error message
const ProductsPage = require("../pageobjects/products.page.js");
// @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("Single product page", () => {
    // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
    beforeEach(async () => {
        // @ts-expect-error TS(2304): Cannot find name 'browser'.
        // eslint-disable-next-line no-undef
        await browser.setWindowSize(935, 730);
        // @ts-expect-error TS(2339): Property 'open' does not exist on type 'typeof Pro... Remove this comment to see the full error message
        await ProductPage.open();
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        // eslint-disable-next-line no-undef
        expect(browser).toHaveUrl("http://localhost:3000/product/1")
    })
    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it(" Adds to cart product", async () => {
        // @ts-expect-error TS(2339): Property 'productsInCartCount' does not exist on t... Remove this comment to see the full error message
        let countBefore = await ProductsPage.productsInCartCount.getHTML(false);
        // @ts-expect-error TS(2339): Property 'addToCart' does not exist on type 'typeo... Remove this comment to see the full error message
        await ProductPage.addToCart();
        // @ts-expect-error TS(2304): Cannot find name 'browser'.
        // eslint-disable-next-line no-undef
        await browser.pause(2000);
        // @ts-expect-error TS(2339): Property 'productsInCartCount' does not exist on t... Remove this comment to see the full error message
        let countAfter = await ProductsPage.productsInCartCount.getHTML(false);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(countBefore + 1).toEqual(countAfter);
    })
    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it(" Returns to products page", async () => {
        // @ts-expect-error TS(2339): Property 'goToProducts' does not exist on type 'ty... Remove this comment to see the full error message
        await ProductPage.goToProducts();
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        // eslint-disable-next-line no-undef
        expect(browser).toHaveUrl("http://localhost:3000/products/1");
    })
    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it(" Returns to home page", async () => {
        // @ts-expect-error TS(2339): Property 'goToHome' does not exist on type 'typeof... Remove this comment to see the full error message
        await ProductPage.goToHome();
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        // eslint-disable-next-line no-undef
        expect(browser).toHaveUrl("http://localhost:3000/");
    })
})