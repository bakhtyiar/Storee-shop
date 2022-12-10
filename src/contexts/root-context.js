import React, {useReducer, useState} from "react";
import {initialState} from "./initialState";
import {authModalReducer} from "./authModalReducer";
import {authUserReducer} from "./authUserReducer";
import {cartReducer} from "./cartReducer";
import {getLocalCart, getProduct, setLocalCart} from "../utils/methods";
export const RootContext = React.createContext(initialState);
export const AuthUserContext = React.createContext(initialState.authUserState);
export const ThemeContext = React.createContext(initialState.themeState);

export const RootContextProvider = ({children}) => {
    const [authModal, dispatchAuthModal] = useReducer(authModalReducer, initialState.authModalState);
    const [authUser, dispatchAuthUser] = useReducer(authUserReducer, initialState.authUserState);
    const [theme, setTheme] = useState(initialState.themeState);
    const [cart, dispatchCart] = useReducer(cartReducer, initialState.cartState);

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

    const loginUser = (serverResponse) => {
        dispatchAuthUser({type: 'login', payload: serverResponse});
    }

    const logoutUser = () => {
        dispatchAuthUser({type: 'logout'});
    }

    const addToCart = async (productId) => {
        let newProduct = await getProduct(productId);
        let newCart = getLocalCart() || initialState.cartState;
        newCart.products.push(newProduct);
        dispatchCart({type: 'set', payload: newCart});
        setLocalCart(newCart);
    }

    const removeFromCart = (indexInCart) => {
        let newCart = getLocalCart() || initialState.cartState;
        newCart.products = newCart.products.filter((product, index) => index !== indexInCart);
        dispatchCart({type: 'set', payload: newCart});
        setLocalCart(newCart);
    }

    const cleanCart = () => {
        dispatchCart({type: 'clean'});
        setLocalCart(initialState.cartState);
    }

    const setCart = (newCart) => {
        dispatchCart({type: 'set', payload: newCart});
        setLocalCart(newCart);
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
            username: authUser.username,
            email: authUser.email,
            firstName: authUser.firstName,
            lastName: authUser.lastName,
            gender: authUser.gender,
            image: authUser.image,
            token: authUser.token,
            onLogin: loginUser,
            onLogout: logoutUser,
        },
        themeState: {
            isDark: theme.isDark,
            onSwitchTheme: switchTheme,
        },
        cartState: {
            id: cart.id,
            products: cart.products,
            total: cart.total,
            discountedTotal: cart.discountedTotal,
            userId: cart.userId,
            totalProducts: cart.totalProducts,
            totalQuantity: cart.totalQuantity,
            onAddToCart: addToCart,
            onRemoveFromCart: removeFromCart,
            onCleanCart: cleanCart,
            onSetCart: setCart,
        },
    };

    return (
        <RootContext.Provider value={rootState}>
            {children}
        </RootContext.Provider>
    )
};