// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'ProductsPa... Remove this comment to see the full error message
const ProductsPage = require("../pageobjects/products.page.js");
// @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("IProducts page", () => {
    // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
    beforeEach(async () => {
        // @ts-expect-error TS(2304): Cannot find name 'browser'.
        // eslint-disable-next-line no-undef
        await browser.setWindowSize(935, 730);
        // @ts-expect-error TS(2339): Property 'open' does not exist on type 'typeof Pro... Remove this comment to see the full error message
        await ProductsPage.open();
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        // eslint-disable-next-line no-undef
        expect(browser).toHaveUrl("http://localhost:3000/products/1")
    })
    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it(" Adds to cart product", async () => {
        // @ts-expect-error TS(2339): Property 'productsInCartCount' does not exist on t... Remove this comment to see the full error message
        let countBefore = await ProductsPage.productsInCartCount;
        // @ts-expect-error TS(2339): Property 'productsSection' does not exist on type ... Remove this comment to see the full error message
        await (await ProductsPage.productsSection).waitForDisplayed();
        // @ts-expect-error TS(2339): Property 'addToCartButtons' does not exist on type... Remove this comment to see the full error message
        const buttons = await ProductsPage.addToCartButtons;
        await buttons[0].click();
        // @ts-expect-error TS(2339): Property 'productsInCartCount' does not exist on t... Remove this comment to see the full error message
        let countAfter = await ProductsPage.productsInCartCount;
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(+countBefore.innerText + 1).toEqual(+countAfter.innerText);
    })
    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it(" Clicks on product card", async () => {
        // @ts-expect-error TS(2339): Property 'productsSection' does not exist on type ... Remove this comment to see the full error message
        await (await ProductsPage.productsSection).waitForDisplayed();
        // @ts-expect-error TS(2339): Property 'productsCards' does not exist on type 't... Remove this comment to see the full error message
        await ProductsPage.productsCards[0].click();
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        // eslint-disable-next-line no-undef
        expect(browser).not.toHaveUrl("http://localhost:3000/products/1");
    })
    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it(" Goes to second page", async () => {
        // @ts-expect-error TS(2339): Property 'productsSection' does not exist on type ... Remove this comment to see the full error message
        await (await ProductsPage.productsSection).waitForDisplayed();
        // @ts-expect-error TS(2339): Property 'goToPage' does not exist on type 'typeof... Remove this comment to see the full error message
        await ProductsPage.goToPage(2);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        // eslint-disable-next-line no-undef
        expect(browser).not.toHaveUrl("http://localhost:3000/products/2");
    })
})