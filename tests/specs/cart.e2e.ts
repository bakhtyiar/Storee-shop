// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'CartPage'.
const CartPage = require("../pageobjects/cart.page");
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'ProductPag... Remove this comment to see the full error message
const ProductPage = require("../pageobjects/product.page");
describe("ICart interactions", () => {
    beforeEach(async () => {
        // @ts-expect-error TS(2304): Cannot find name 'browser'.
        // eslint-disable-next-line no-undef
        await browser.setWindowSize(935, 730);
        await ProductPage.open();
        await ProductPage.addToCart();
        // @ts-expect-error TS(2304): Cannot find name 'browser'.
        // eslint-disable-next-line no-undef
        await browser.pause(500);
        await CartPage.open();
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        // eslint-disable-next-line no-undef
        expect(browser).toHaveUrl("http://localhost:3000/cart")
    })
    afterEach(() => {
        browser.execute('window.localStorage.removeItem("cart")');
    });
    it(" Goes to product's page", async () => {
        await (await CartPage.productsSection).waitForDisplayed();
        await CartPage.productsLinks[0].click();
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        // eslint-disable-next-line no-undef
        expect(browser).toHaveUrl("http://localhost:3000/product/1")
    })
    it(" Adds 1 more quant of product", async () => {
        await (await CartPage.productsSection).waitForDisplayed();
        let quantityBefore = await CartPage.quantityInputs[0].getValue()
        await CartPage.plusQuantButtons[0].click()
        let quantityAfter = await CartPage.quantityInputs[0].getValue()
        expect(+quantityBefore + 1).toEqual(+quantityAfter)
    })
    it(" Removes 1 quant of product", async () => {
        await (await CartPage.productsSection).waitForDisplayed();
        let quantityBefore = await CartPage.quantityInputs[0].getValue()
        await CartPage.plusQuantButtons[0].click()
        let quantityAfter = await CartPage.quantityInputs[0].getValue()
        expect(+quantityBefore + 1).toEqual(+quantityAfter)
        await CartPage.minusQuantButtons[0].click()
        quantityAfter = await CartPage.quantityInputs[0].getValue()
        expect(+quantityBefore).toEqual(+quantityAfter)
    })
    it(" Deletes product on 0 quantity", async () => {
        await (await CartPage.productsSection).waitForDisplayed();
        await CartPage.minusQuantButtons[0].waitForExist();
        await CartPage.minusQuantButtons[0].click();
        await CartPage.productsSection.waitForExist({ reverse: true });
        expect(await CartPage.productsSection.isExisting()).toBeFalsy();
    })
    it(" Deletes product on click", async () => {
        await (await CartPage.productsSection).waitForDisplayed();
        await CartPage.removeButtons[0].waitForExist();
        await CartPage.removeButtons[0].click();
        await CartPage.productsSection.waitForExist({ reverse: true });
        expect(await CartPage.productsSection.isExisting()).toBeFalsy();
    })
    it(" Makes order", async () => {
        await (await CartPage.productsSection).waitForDisplayed();
        await CartPage.makeOrderButton.click();
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        // eslint-disable-next-line no-undef
        expect(browser).toHaveUrl("http://localhost:3000/orderMaking")
    })
    it(" Should be disabled 'make order' button on empty cart", async () => {
        await (await CartPage.productsSection).waitForDisplayed();
        await CartPage.removeButtons[0].waitForExist();
        await CartPage.removeButtons[0].click();
        await CartPage.productsSection.waitForExist({ reverse: true });
        expect(await CartPage.productsSection.isExisting()).toBeFalsy();
        expect(await CartPage.makeOrderButton).toHaveAttribute('disabled');
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        // eslint-disable-next-line no-undef
        expect(browser).toHaveUrl("http://localhost:3000/cart")
    })
})