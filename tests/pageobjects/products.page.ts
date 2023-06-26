// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'Page'.
const Page = require('./page');

// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'ProductsPa... Remove this comment to see the full error message
class ProductsPage extends Page {

    get productsInCartCount() {
        // @ts-expect-error TS(2581): Cannot find name '$'. Do you need to install type ... Remove this comment to see the full error message
        // eslint-disable-next-line no-undef
        return $("span[data-testid='cart-products-count']")
    }

    get categoryButtons() {
        // @ts-expect-error TS(2304): Cannot find name '$$'.
        // eslint-disable-next-line no-undef
        return $$("section[data-testid=\"categories-filter\"] > button")
    }

    get productsSection() {
        // @ts-expect-error TS(2581): Cannot find name '$'. Do you need to install type ... Remove this comment to see the full error message
        // eslint-disable-next-line no-undef
        return $("div[data-testid='products']")
    }

    get pageItems() {
        // @ts-expect-error TS(2304): Cannot find name '$$'.
        // eslint-disable-next-line no-undef
        return $$("ul[data-testid=\"pagination\"] > li");
    }
    get pageButtons() {
        // @ts-expect-error TS(2304): Cannot find name '$$'.
        // eslint-disable-next-line no-undef
        return $$("ul[data-testid=\"pagination\"] > li a");
    }

    get productsCards() {
        // @ts-expect-error TS(2304): Cannot find name '$$'.
        // eslint-disable-next-line no-undef
        return $$("a[data-testid=\"product-card\"]")
    }

    get addToCartButtons() {
        // @ts-expect-error TS(2304): Cannot find name '$$'.
        // eslint-disable-next-line no-undef
        return $$("button[data-testid=\"add-to-card-button\"]")
    }

    async addToCart() {
        await this.addToCartButtons[0].click();
    }

    #findNodesByText(node: any, regex: any) {
        let nodes: any = [];
        let recursiveSearch = (currentNode: any, regex: any) => {
            let matched = currentNode.innerText.match(regex);
            if (matched) {
                nodes.push(currentNode);
            }
            currentNode.forEach((childNode: any) => {
                recursiveSearch(childNode, regex);
            })
        }
        recursiveSearch(node, regex);
        return nodes;
    }

    #isHaveTextDeep(node: any, regex: any) {
        let nodes = [];
        let recursiveSearch = (currentNode: any, regex: any) => {
            let matched = currentNode.innerText.match(regex);
            if (matched) {
                nodes.push(currentNode);
            }
            currentNode.childNodes.forEach((childNode: any) => {
                recursiveSearch(childNode, regex);
            })
        }
        recursiveSearch(node, regex);
        return !!nodes.length;
    }

    async goToPage(number: any) {
        let pattern = `^${number}$`;
        let flags = 'gi';
        let regex = new RegExp(pattern, flags);
        let buttons = await this.pageButtons;
        let pageButtons = buttons.filter(
            async (button: any) => {
                return this.#isHaveTextDeep( await button.getHTML(), regex)
            });
        await pageButtons[0].click();
    }

    async goFirstPage() {
        let pattern = `^first$`;
        let flags = 'gi';
        let regex = new RegExp(pattern, flags);
        let buttons = await this.pageButtons;
        let neededPage = buttons.filter((button: any) => this.#isHaveTextDeep(button, regex))[0];
        neededPage.click();
    }
    async goPrevPage() {
        let pattern = `^previous$`;
        let flags = 'gi';
        let regex = new RegExp(pattern, flags);
        let buttons = await this.pageButtons;
        let neededPage = buttons.filter((button: any) => this.#isHaveTextDeep(button, regex))[0];
        neededPage.click();
    }

    async goNextPage() {
        let pattern = `^next$`;
        let flags = 'gi';
        let regex = new RegExp(pattern, flags);
        let buttons = await this.pageButtons;
        let neededPage = buttons.filter((button: any) => this.#isHaveTextDeep(button, regex))[0];
        neededPage.click();
    }

    async goLastPage() {
        let pattern = `^last$`;
        let flags = 'gi';
        let regex = new RegExp(pattern, flags);
        let buttons = await this.pageButtons;
        let neededPage = buttons.filter((button: any) => this.#isHaveTextDeep(button, regex))[0];
        neededPage.click();
    }

    open () {
        return super.open("products");
    }
}

module.exports = new ProductsPage();