export const initialState = {
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
        id: -1,
        username: '',
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        gender: '',
        image: '',
        token: '',
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