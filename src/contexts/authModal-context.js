import React, {useReducer} from "react";
import {authModalReducer} from "./authModalReducer";

const initialState = {
    isShow: false,
    authType: '',
    onRegister: () => {
    },
    onLogin: () => {
    },
    onShow: () => {
    },
    onHide: () => {
    },
    onSwitchType: () => {
    },
};

export const AuthModalContext = React.createContext(initialState);

export const AuthModalContextProvider = ({children}) => {
    const [authModal, dispatchAuthModal] = useReducer(authModalReducer, initialState);

    const authRegHandler = () => {
        dispatchAuthModal({type: 'authTypeRegister'});
        dispatchAuthModal({type: 'setShow', payload: true});
    }

    const authLoginHandler = () => {
        dispatchAuthModal({type: 'authTypeLogin'});
        dispatchAuthModal({type: 'setShow', payload: true});
    }

    const showModal = () => {
        dispatchAuthModal({type: 'setShow', payload: true});
    }

    const hideModal = () => {
        dispatchAuthModal({type: 'setShow', payload: false});
    }

    const switchAuthType = () => {
        if (authModal.authType === 'register') {
            dispatchAuthModal({type: 'authTypeLogin'});
        } else {
            dispatchAuthModal({type: 'authTypeRegister'});
        }
    }

    const state = {
        isShow: authModal.isShow,
        authType: authModal.authType,
        onRegister: authRegHandler,
        onLogin: authLoginHandler,
        onShow: showModal,
        onHide: hideModal,
        onSwitchType: switchAuthType,
    };

    return (
        <AuthModalContext.Provider value={state}>
            {children}
        </AuthModalContext.Provider>
    )
};