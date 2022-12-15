export const initialState = {
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
    cartState: {
        id: -1,
        products: [],
        total: 0,
        discountedTotal: 0,
        userId: 0,
        totalProducts: 0,
        totalQuantity: 0,
        onAddToCart: () => {
        },
        onRemoveFromCart: () => {
        },
        onCleanCart: () => {
        },
        onSetCart: () => {
        },
    },
};