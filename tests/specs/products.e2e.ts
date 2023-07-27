// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'ProductsPa... Remove this comment to see the full error message
const ProductsPage = require("../pageobjects/products.page");
describe("IProducts page", () => {
    beforeEach(async () => {
        // @ts-expect-error TS(2304): Cannot find name 'browser'.
        // eslint-disable-next-line no-undef
        await browser.setWindowSize(935, 730);
        await ProductsPage.open();
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        // eslint-disable-next-line no-undef
        expect(browser).toHaveUrl("http://localhost:3000/products/1")
    })
    it(" Adds to cart product", async () => {
        let countBefore = await ProductsPage.productsInCartCount;
        await (await ProductsPage.productsSection).waitForDisplayed();
        const buttons = await ProductsPage.addToCartButtons;
        await buttons[0].click();
        let countAfter = await ProductsPage.productsInCartCount;
        expect(+countBefore.innerText + 1).toEqual(+countAfter.innerText);
    })
    it(" Clicks on product card", async () => {
        await (await ProductsPage.productsSection).waitForDisplayed();
        await ProductsPage.productsCards[0].click();
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        // eslint-disable-next-line no-undef
        expect(browser).not.toHaveUrl("http://localhost:3000/products/1");
    })
    it(" Goes to second page", async () => {
        await (await ProductsPage.productsSection).waitForDisplayed();
        await ProductsPage.goToPage(2);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        // eslint-disable-next-line no-undef
        expect(browser).not.toHaveUrl("http://localhost:3000/products/2");
    })
})