import {initialState} from "./initialState";

export const authUserReducer = (state: any, action: any) => {
    switch (action.type) {
        case 'login':
            return {
                ...state,
                isLoggedIn: true,
                ...action.payload,
            };
        case 'logout':
            return {
                ...state,
                isLoggedIn: false,
                id: -1,
                username: '',
                email: '',
                firstName: '',
                lastName: '',
                gender: '',
                image: '',
                token: '',
            };
        default:
            return initialState;
    }
}