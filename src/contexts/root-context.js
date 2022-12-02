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
    authUserState: {
        isLoggedIn: false,
        id: 0,
        onLogin: () => {
        },
        onLogout: () => {
        },
    },
    themeState: {
        isDark: false,
        onSwitchTheme: () => {
        },
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

const authUserReducer = (state, action) => {
    switch (action.type) {
        case 'login':
            return {...state, isLoggedIn: true, id: action.payload};
        case 'logout':
            return {...state, isLoggedIn: false, id: 0};
        default:
            return initialState;
    }
}

export const RootContext = React.createContext(initialState);
export const AuthUserContext = React.createContext(initialState.authUserState);
export const ThemeContext = React.createContext(initialState.themeState);

export const RootContextProvider = ({children}) => {
    const [authModal, dispatchAuthModal] = useReducer(authModalReducer, initialState.authModalState);
    const [authUser, dispatchAuthUser] = useReducer(authUserReducer, initialState.authUserState);
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

    const loginUser = (id) => {
        dispatchAuthUser({type: 'login', payload: id});
    }

    const logoutUser = () => {
        dispatchAuthUser({type: 'logout', payload: 0});
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
        authUserState: {
            isLoggedIn: authUser.isLoggedIn,
            id: authUser.id,
            onLogin: loginUser,
            onLogout: logoutUser,
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