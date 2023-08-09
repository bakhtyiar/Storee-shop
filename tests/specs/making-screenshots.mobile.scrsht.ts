import {routes} from "../../src/utils/constants";
import {browser} from "@wdio/globals";
import {setMobilePortraitScreenSize} from "../integration-helpers/screenSetters";

const AuthPage = require('../pageobjects/auth.page');
//todo : захардкодить все страницы с тестами, забить на автоматизацию
describe('Making screenshots', () => {
    beforeEach(async () => {
        await setMobilePortraitScreenSize();
    })

    it(` home's full-page and tabbable-page`, async () => {
        // @ts-ignore
        await browser.url(`http://localhost:3000${routes['home']['path']}`);
        // @ts-ignore
        await browser.saveFullPageScreen(`home-fullPage`, {
            /* some options */
        })
        // @ts-ignore
        await browser.saveTabbablePage(`home-save-tabbable`, {
            /* some options, use the same options as for saveFullPageScreen */
        })
    })

    it(` products' full-page and tabbable-page`, async () => {
        await browser.setTimeout({
            'script': 300000
        });
        // @ts-ignore
        await browser.url(`http://localhost:3000${routes['products']['path']}`);
        // @ts-ignore
        await browser.saveFullPageScreen(`products-fullPage`, {
            /* some options */
        })
        // @ts-ignore
        await browser.saveTabbablePage(`products-save-tabbable`, {
            /* some options, use the same options as for saveFullPageScreen */
        })
    })

    it(` product's full-page and tabbable-page`, async () => {
        // @ts-ignore
        await browser.url(`http://localhost:3000${routes['product']['path']}/1`);
        // @ts-ignore
        await browser.saveScreen(`product-fullPage`, {
            /* some options */
        })
        // @ts-ignore
        await browser.saveTabbablePage(`product-save-tabbable`, {
            /* some options, use the same options as for saveFullPageScreen */
        })
    })

    it(` news' full-page and tabbable-page`, async function() {
        await browser.setTimeout({
            'script': 300000
        });
        // @ts-ignore
        await browser.url(`http://localhost:3000${routes['news']['path']}`);
        // @ts-ignore
        await browser.saveScreen(`news-screen`, {
            /* some options */
        })
        // @ts-ignore
        await browser.saveTabbablePage(`news-save-tabbable`, {
            /* some options, use the same options as for saveFullPageScreen */
        })
    })

    it(` newsPost's full-page and tabbable-page`, async () => {
        // @ts-ignore
        await browser.url(`http://localhost:3000${routes['newsPost']['path']}/1`);
        // @ts-ignore
        await browser.saveFullPageScreen(`newsPost-fullPage`, {
            /* some options */
        })
        // @ts-ignore
        await browser.saveTabbablePage(`newsPost-save-tabbable`, {
            /* some options, use the same options as for saveFullPageScreen */
        })
    })

    it(` cart's full-page and tabbable-page`, async () => {
        // @ts-ignore
        await browser.url(`http://localhost:3000${routes['cart']['path']}`);
        // @ts-ignore
        await browser.saveFullPageScreen(`cart-fullPage`, {
            /* some options */
        })
        // @ts-ignore
        await browser.saveTabbablePage(`cart-save-tabbable`, {
            /* some options, use the same options as for saveFullPageScreen */
        })
    })

    it(` makes orderMaking's full-page and tabbable-page`, async () => {
        await browser.setTimeout({
            'script': 3000000
        });
        // @ts-ignore
        await browser.url(`http://localhost:3000${routes['orderMaking']['path']}`);
        // @ts-ignore
        await browser.saveFullPageScreen(`orderMaking-fullPage`, {
            /* some options */
        })
        // @ts-ignore
        await browser.saveTabbablePage(`orderMaking-save-tabbable`, {
            /* some options, use the same options as for saveFullPageScreen */
        })
    })

    it(` orderCompleted's full-page and tabbable-page`, async () => {
        // @ts-ignore
        await browser.url(`http://localhost:3000${routes['orderCompleted']['path']}`);
        // @ts-ignore
        await browser.saveFullPageScreen(`orderCompleted-fullPage`, {
            /* some options */
        })
        // @ts-ignore
        await browser.saveTabbablePage(`orderCompleted-save-tabbable`, {
            /* some options, use the same options as for saveFullPageScreen */
        })
    })

    it(` profile's full-page and tabbable-page`, async () => {
        // @ts-ignore
        await browser.url(`http://localhost:3000${routes['profile']['path']}`);
        // @ts-ignore
        await browser.saveFullPageScreen(`profile-fullPage`, {
            /* some options */
        })
        // @ts-ignore
        await browser.saveTabbablePage(`profile-save-tabbable`, {
            /* some options, use the same options as for saveFullPageScreen */
        })
    })

    it(` login's full-page and tabbable-page`, async () => {
        // @ts-ignore
        await browser.url(`http://localhost:3000${routes['login']['path']}`);
        // @ts-ignore
        await browser.saveFullPageScreen(`login-fullPage`, {
            /* some options */
        })
        // @ts-ignore
        await browser.saveTabbablePage(`login-save-tabbable`, {
            /* some options, use the same options as for saveFullPageScreen */
        })
    })

    it(` register's full-page and tabbable-page`, async () => {
        // @ts-ignore
        await browser.url(`http://localhost:3000${routes['register']['path']}`);
        // @ts-ignore
        await browser.saveFullPageScreen(`register-fullPage`, {
            /* some options */
        })
        // @ts-ignore
        await browser.saveTabbablePage(`register-save-tabbable`, {
            /* some options, use the same options as for saveFullPageScreen */
        })
    })

    it(` notFound's full-page and tabbable-page`, async () => {
        // @ts-ignore
        await browser.url(`http://localhost:3000${routes['notFound']['path']}`);
        // @ts-ignore
        await browser.saveFullPageScreen(`notFound-fullPage`, {
            /* some options */
        })
        // @ts-ignore
        await browser.saveTabbablePage(`notFound-save-tabbable`, {
            /* some options, use the same options as for saveFullPageScreen */
        })
    })

    it(` authed profile full-page and tabbable-page`, async () => {
        await AuthPage.open();
        await AuthPage.showMenuMobile();
        await AuthPage.showLoginFormMobile();
        // await AuthPage.inputUsername.waitForDisplayed();
        await AuthPage.completeLoginForm("kminchelle", "0lelplR");
        await browser.waitUntil(async () => {
            let pageUrl: string = await browser.getUrl();
            return pageUrl.includes(`${routes['profile']['path']}`);
        }, 5000)
        // @ts-ignore
        await browser.url(`http://localhost:3000${routes['profile']['path']}`);
        // @ts-ignore
        await browser.saveFullPageScreen(`profile-authed-fullPage`, {
            /* some options */
        })
        // @ts-ignore
        await browser.saveTabbablePage(`profile-authed-save-tabbable`, {
            /* some options, use the same options as for saveFullPageScreen */
        })

    })
})