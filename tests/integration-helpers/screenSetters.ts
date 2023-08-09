export const setDesktopScreenSize = async () => {
    await browser.setWindowSize(1260, 680);
}

export const setMobilePortraitScreenSize = async () => {
    await browser.setWindowSize(360, 640);
}