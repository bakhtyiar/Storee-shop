import React, {useReducer} from "react";

const initialState = {
        authModalState: {
            isShow: false,
            authType: '',
            onRegister: () => {},
            onLogin: () => {},
            onHide: () => {},
            onSwitchType: () => {},
        },

};

const authModalReducer = (state, action) => {
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

export const RootContext = React.createContext(initialState);

export const RootContextProvider = ({children}) => {
    const [authModal, dispatchAuthModal] = useReducer(authModalReducer, initialState.authModalState);

    const authRegHandler = () => {
        dispatchAuthModal({type: 'authTypeRegister'});
        dispatchAuthModal({type: 'setShow', payload: true});
    }

    const authLoginHandler = () => {
        dispatchAuthModal({type: 'authTypeLogin'});
        dispatchAuthModal({type: 'setShow', payload: true});
    }

    const hideModal = () => {
        dispatchAuthModal({type: 'setShow', payload: false});
    }

    const switchAuthType = () => {
        if (authModal.authType == 'register') {
            dispatchAuthModal({type: 'authTypeLogin'});
        } else {
            dispatchAuthModal({type: 'authTypeRegister'});
        }
    }

    const authModalState = {
        isShow: authModal.isShow,
        authType: authModal.authType,
        onRegister: authRegHandler,
        onLogin: authLoginHandler,
        onHide: hideModal,
        onSwitchType: switchAuthType,
    };

    return (
        <RootContext.Provider value={authModalState}>
            {children}
        </RootContext.Provider>
    )
};