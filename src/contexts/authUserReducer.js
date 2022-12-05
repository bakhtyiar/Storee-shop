import {initialState} from "./initialState";

export const authUserReducer = (state, action) => {
    switch (action.type) {
        case 'login':
            const {id, username, token, password, email, firstName, lastName, gender, image} = action.payload;
            return {
                ...state,
                isLoggedIn: true,
                id: id,
                username: username,
                email: email,
                firstName: firstName,
                lastName: lastName,
                gender: gender,
                image: image,
                token: token,
                password: password,
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