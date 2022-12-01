import React, {useReducer, useState} from "react";

const initialState = {
    authModalState: {
        isShow: false,
        authType: '',
        onRegister: () => {
        },
        onLogin: () => {
        },
        onHide: () => {
        },
        onSwitchType: () => {
        },
    },
    themeState: {
        isDark: false,
        onSwitchTheme: () => {
        },
    }
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
export const ThemeContext = React.createContext(initialState.themeState);

export const RootContextProvider = ({children}) => {
    const [authModal, dispatchAuthModal] = useReducer(authModalReducer, initialState.authModalState);
    const [theme, setTheme] = useState(initialState.themeState);

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
        if (authModal.authType === 'register') {
            dispatchAuthModal({type: 'authTypeLogin'});
        } else {
            dispatchAuthModal({type: 'authTypeRegister'});
        }
    }

    const switchTheme = () => {
        setTheme((prevState) => (
            {
                ...prevState,
                isDark: !prevState.isDark
            })
        );
    }

    const rootState = {
        authModalState: {
            isShow: authModal.isShow,
            authType: authModal.authType,
            onRegister: authRegHandler,
            onLogin: authLoginHandler,
            onHide: hideModal,
            onSwitchType: switchAuthType,
        },
        themeState: {
            isDark: theme.isDark,
            onSwitchTheme: switchTheme,
        },
    };

    return (
        <RootContext.Provider value={rootState}>
            {children}
        </RootContext.Provider>
    )
};