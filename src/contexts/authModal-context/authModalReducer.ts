import {initialState} from "../root-context/initialState";

export const authModalReducer = (state, action) => {
    switch (action.type) {
        case 'setShow':
            return {...state, isShow: action.payload};
        case 'authTypeRegister':
            return {...state, authType: 'register'};
        case 'authTypeLogin':
            return {...state, authType: 'login'};
        default:
            return initialState;
    }
}