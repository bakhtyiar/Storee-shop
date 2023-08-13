import {TestIteration} from "../runs";

export const setDesktopScreenSize = async () => {
    // @ts-ignore
    await browser.setWindowSize(1260, 680);
}

export const setMobilePortraitScreenSize = async () => {
    // @ts-ignore
    await browser.setWindowSize(360, 640);
}

export const setRelevantScreen = async (run: TestIteration): Promise<void> => {
    if (run.options.deviceType === 'mobile' && run.options.orientation === 'portrait') {
        await setMobilePortraitScreenSize();
    } else if (run.options.deviceType === 'desktop' && run.options.orientation === 'album') {
        await setDesktopScreenSize();
    } else {
        throw new Error('No relevant test type')
    }
}