import {initialState} from "./initialState";

export const cartReducer = (state, action) => {
    switch (action.type) {
        case 'set':
            return {
                ...state,
                ...action.payload,
            };
        default:
            return initialState;
    }
}