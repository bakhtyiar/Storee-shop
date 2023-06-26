/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
module.exports = class Page {
    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
    open (path: any) {
        // @ts-expect-error TS(2304): Cannot find name 'browser'.
        // eslint-disable-next-line no-undef
        return browser.url(`http://localhost:3000/${path}`)
    }
}
