import {setDesktopScreenSize, setMobilePortraitScreenSize} from "./integration-helpers/screenSetters";

export type DeviceType = 'desktop' | 'mobile' | 'tablet';
export type Orientation = 'portrait' | 'album';
export interface TestIteration {
    it: string,
    options: {
        deviceType: DeviceType,
        orientation: Orientation,
        screenSetter: () => void,
    }
}
export type Runs = Array<TestIteration>;

export const runsData: Runs = [
    {
        it: 'desktop',
        options: {
            deviceType: 'desktop',
            orientation: 'album',
            screenSetter: setDesktopScreenSize,
        },
    },
    {
        it: 'mobile portrait',
        options: {
            deviceType: 'mobile',
            orientation: 'portrait',
            screenSetter: setMobilePortraitScreenSize,
        },
    },
];