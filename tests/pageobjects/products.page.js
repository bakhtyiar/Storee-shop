const Page = require('./page');

class ProductsPage extends Page {

    get productsInCartCount() {
        // eslint-disable-next-line no-undef
        return $("span[data-testid='cart-products-count']")
    }

    get categoryButtons() {
        // eslint-disable-next-line no-undef
        return $$("section[data-testid=\"categories-filter\"] > button")
    }

    get productsSection() {
        // eslint-disable-next-line no-undef
        return $("div[data-testid='products']")
    }

    get pageItems() {
        // eslint-disable-next-line no-undef
        return $$("ul[data-testid=\"pagination\"] > li");
    }
    get pageButtons() {
        // eslint-disable-next-line no-undef
        return $$("ul[data-testid=\"pagination\"] > li a");
    }

    get productsCards() {
        // eslint-disable-next-line no-undef
        return $$("a[data-testid=\"product-card\"]")
    }

    get addToCartButtons() {
        // eslint-disable-next-line no-undef
        return $$("button[data-testid=\"add-to-card-button\"]")
    }

    async addToCart() {
        await this.addToCartButtons[0].click();
    }

    #findNodesByText(node, regex) {
        let nodes = [];
        let recursiveSearch = (currentNode, regex) => {
            let matched = currentNode.innerText.match(regex);
            if (matched) {
                nodes.push(currentNode);
            }
            currentNode.forEach((childNode) => {
                recursiveSearch(childNode, regex);
            })
        }
        recursiveSearch(node, regex);
        return nodes;
    }

    #isHaveTextDeep(node, regex) {
        let nodes = [];
        let recursiveSearch = (currentNode, regex) => {
            let matched = currentNode.innerText.match(regex);
            if (matched) {
                nodes.push(currentNode);
            }
            currentNode.childNodes.forEach((childNode) => {
                recursiveSearch(childNode, regex);
            })
        }
        recursiveSearch(node, regex);
        return !!nodes.length;
    }

    async goToPage(number) {
        let pattern = `^${number}$`;
        let flags = 'gi';
        let regex = new RegExp(pattern, flags);
        let buttons = await this.pageButtons;
        let pageButtons = buttons.filter(
            async (button) => {
                return this.#isHaveTextDeep( await button.getHTML(), regex)
            });
        await pageButtons[0].click();
    }

    async goFirstPage() {
        let pattern = `^first$`;
        let flags = 'gi';
        let regex = new RegExp(pattern, flags);
        let buttons = await this.pageButtons;
        let neededPage = buttons.filter((button) => this.#isHaveTextDeep(button, regex))[0];
        neededPage.click();
    }
    async goPrevPage() {
        let pattern = `^previous$`;
        let flags = 'gi';
        let regex = new RegExp(pattern, flags);
        let buttons = await this.pageButtons;
        let neededPage = buttons.filter((button) => this.#isHaveTextDeep(button, regex))[0];
        neededPage.click();
    }

    async goNextPage() {
        let pattern = `^next$`;
        let flags = 'gi';
        let regex = new RegExp(pattern, flags);
        let buttons = await this.pageButtons;
        let neededPage = buttons.filter((button) => this.#isHaveTextDeep(button, regex))[0];
        neededPage.click();
    }

    async goLastPage() {
        let pattern = `^last$`;
        let flags = 'gi';
        let regex = new RegExp(pattern, flags);
        let buttons = await this.pageButtons;
        let neededPage = buttons.filter((button) => this.#isHaveTextDeep(button, regex))[0];
        neededPage.click();
    }

    open () {
        return super.open("products");
    }
}

module.exports = new ProductsPage();