import {routes} from "../../src/utils/constants";
import {browser} from "@wdio/globals";
// import AuthPage from "../pageobjects/auth.page";

describe('Compare successful with a baseline', () => {
    beforeEach(async () => {
        // @ts-ignore
        await browser.setWindowSize(935, 730);
        // @ts-ignore
        await browser.url('http://localhost:3000')
    })


    it(` home's full-page and tabbable-page`, async () => {
        // @ts-ignore
        await browser.url(`http://localhost:3000${routes['home']['path']}`);
        // @ts-ignore
        await expect(
        await browser.checkFullPageScreen(`home-fullPage`, {
            /* some options */
        })
        ).toEqual(0)
        // @ts-ignore
        await expect(
        await browser.checkTabbablePage(`home-save-tabbable`, {
            /* some options, use the same options as for checkFullPageScreen */
        })
        ).toEqual(0)
    })

    it(` products' full-page and tabbable-page`, async () => {
        // @ts-ignore
        await browser.url(`http://localhost:3000${routes['products']['path']}`);
        // @ts-ignore
        await expect(
        await browser.checkFullPageScreen(`products-fullPage`, {
            /* some options */
        })
        ).toEqual(0)
        // @ts-ignore
        await expect(
        await browser.checkTabbablePage(`products-save-tabbable`, {
            /* some options, use the same options as for checkFullPageScreen */
        })
        ).toEqual(0)
    })

    it(` product's full-page and tabbable-page`, async () => {
        // @ts-ignore
        await browser.url(`http://localhost:3000${routes['product']['path']}/1`);
        // @ts-ignore
        await expect(
        await browser.checkFullPageScreen(`product-fullPage`, {
            /* some options */
        })
        ).toEqual(0)
        // @ts-ignore
        await expect(
        await browser.checkTabbablePage(`product-save-tabbable`, {
            /* some options, use the same options as for checkFullPageScreen */
        })
        ).toEqual(0)
    })

    it(` news' full-page and tabbable-page`, async () => {
        // @ts-ignore
        await browser.url(`http://localhost:3000${routes['news']['path']}`);
        // @ts-ignore
        await expect(
        await browser.checkFullPageScreen(`news-fullPage`, {
            /* some options */
        })
        ).toEqual(0)
        // @ts-ignore
        await expect(
        await browser.checkTabbablePage(`news-save-tabbable`, {
            /* some options, use the same options as for checkFullPageScreen */
        })
        ).toEqual(0)
    })

    it(` newsPost's full-page and tabbable-page`, async () => {
        // @ts-ignore
        await browser.url(`http://localhost:3000${routes['newsPost']['path']}/1`);
        // @ts-ignore
        await expect(
        await browser.checkFullPageScreen(`newsPost-fullPage`, {
            /* some options */
        })
        ).toEqual(0)
        // @ts-ignore
        await expect(
        await browser.checkTabbablePage(`newsPost-save-tabbable`, {
            /* some options, use the same options as for checkFullPageScreen */
        })
        ).toEqual(0)
    })

    it(` cart's full-page and tabbable-page`, async () => {
        // @ts-ignore
        await browser.url(`http://localhost:3000${routes['cart']['path']}`);
        // @ts-ignore
        await expect(
        await browser.checkFullPageScreen(`cart-fullPage`, {
            /* some options */
        })
        ).toEqual(0)
        // @ts-ignore
        await expect(
        await browser.checkTabbablePage(`cart-save-tabbable`, {
            /* some options, use the same options as for checkFullPageScreen */
        })
        ).toEqual(0)
    })

    it(` makes orderMaking's full-page and tabbable-page`, async () => {
        // @ts-ignore
        await browser.url(`http://localhost:3000${routes['orderMaking']['path']}`);
        // @ts-ignore
        await expect(
        await browser.checkFullPageScreen(`orderMaking-fullPage`, {
            /* some options */
        })
        ).toEqual(0)
        // @ts-ignore
        await expect(
        await browser.checkTabbablePage(`orderMaking-save-tabbable`, {
            /* some options, use the same options as for checkFullPageScreen */
        })
        ).toEqual(0)
    })

    it(` orderCompleted's full-page and tabbable-page`, async () => {
        // @ts-ignore
        await browser.url(`http://localhost:3000${routes['orderCompleted']['path']}`);
        // @ts-ignore
        await expect(
        await browser.checkFullPageScreen(`orderCompleted-fullPage`, {
            /* some options */
        })
        ).toEqual(0)
        // @ts-ignore
        await expect(
        await browser.checkTabbablePage(`orderCompleted-save-tabbable`, {
            /* some options, use the same options as for checkFullPageScreen */
        })
        ).toEqual(0)
    })

    it(` profile's full-page and tabbable-page`, async () => {
        // @ts-ignore
        await browser.url(`http://localhost:3000${routes['profile']['path']}`);
        // @ts-ignore
        await expect(
        await browser.checkFullPageScreen(`profile-fullPage`, {
            /* some options */
        })
        ).toEqual(0)
        // @ts-ignore
        await expect(
        await browser.checkTabbablePage(`profile-save-tabbable`, {
            /* some options, use the same options as for checkFullPageScreen */
        })
        ).toEqual(0)
    })

    it(` login's full-page and tabbable-page`, async () => {
        // @ts-ignore
        await browser.url(`http://localhost:3000${routes['login']['path']}`);
        // @ts-ignore
        await expect(
        await browser.checkFullPageScreen(`login-fullPage`, {
            /* some options */
        })
        ).toEqual(0)
        // @ts-ignore
        await expect(
        await browser.checkTabbablePage(`login-save-tabbable`, {
            /* some options, use the same options as for checkFullPageScreen */
        })
        ).toEqual(0)
    })

    it(` register's full-page and tabbable-page`, async () => {
        // @ts-ignore
        await browser.url(`http://localhost:3000${routes['register']['path']}`);
        // @ts-ignore
        await expect(
        await browser.checkFullPageScreen(`register-fullPage`, {
            /* some options */
        })
        ).toEqual(0)
        // @ts-ignore
        await expect(
        await browser.checkTabbablePage(`register-save-tabbable`, {
            /* some options, use the same options as for checkFullPageScreen */
        })
        ).toEqual(0)
    })

    it(` notFound's full-page and tabbable-page`, async () => {
        // @ts-ignore
        await browser.url(`http://localhost:3000${routes['notFound']['path']}`);
        // @ts-ignore
        await expect(
        await browser.checkFullPageScreen(`notFound-fullPage`, {
            /* some options */
        })
        ).toEqual(0)
        // @ts-ignore
        await expect(
        await browser.checkTabbablePage(`notFound-save-tabbable`, {
            /* some options, use the same options as for checkFullPageScreen */
        })
        ).toEqual(0)
    })

    // it(` authed profile full-page and tabbable-page`, async () => {
    //     await AuthPage.open();
    //     await AuthPage.showLoginForm();
    //     // await AuthPage.inputUsername.waitForDisplayed();
    //     await AuthPage.completeLoginForm("kminchelle", "0lelplR");
    //     await browser.waitUntil(async () => {
    //         let pageUrl: string = await browser.getUrl();
    //         return pageUrl.includes(`${routes['profile']['path']}`);
    //     }, 5000)
    //     // @ts-ignore
    //     await browser.url(`http://localhost:3000${routes['profile']['path']}`);
    //     // @ts-ignore
    //     await browser.checkFullPageScreen(`profile-authed-fullPage`, {
    //         /* some options */
    //     })
    //     // @ts-ignore
    //     await browser.checkTabbablePage(`profile-authed-save-tabbable`, {
    //         /* some options, use the same options as for checkFullPageScreen */
    //     })
    //
    // })
})