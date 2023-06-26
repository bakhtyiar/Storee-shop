import {initialState} from "./initialState";

export const cartReducer = (state: any, action: any) => {
    switch (action.type) {
        case 'set':
            return {
                ...state,
                ...action.payload,
            };
        case 'clean':
        default:
            return initialState;
    }
}