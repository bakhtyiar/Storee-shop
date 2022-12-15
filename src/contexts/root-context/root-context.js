import React, {useReducer, useState} from "react";
import {initialState} from "./initialState";
import {authUserReducer} from "./authUserReducer";
import {cartReducer} from "./cartReducer";
import {deleteCookie, setCookie} from "../../utils/cookies/cookies";
import {getProduct} from "../../utils/server-api/products/products";
import {getLocalCart, setLocalCart} from "../../utils/server-api/cart/cart";

export const RootContext = React.createContext(initialState);

export const RootContextProvider = ({children}) => {
    const [authUser, dispatchAuthUser] = useReducer(authUserReducer, initialState.authUserState);
    const [theme, setTheme] = useState(initialState.themeState);
    const [cart, dispatchCart] = useReducer(cartReducer, initialState.cartState);

    const switchTheme = () => {
        setTheme((prevState) => (
            {
                ...prevState,
                isDark: !prevState.isDark
            })
        );
    }

    const loginUser = (serverResponse) => {
        setCookie('user', serverResponse.id, {path: '/', 'max-age': 36000, secure: true, samesite: 'lax'});
        dispatchAuthUser({type: 'login', payload: serverResponse});
    }

    const logoutUser = () => {
        deleteCookie('user');
        dispatchAuthUser({type: 'logout'});
    }

    const addToCart = async (productId) => {
        let newProduct = await getProduct(productId);
        let newCart = getLocalCart() || initialState.cartState;
        newCart.products.push(newProduct);
        newCart.total = newCart.products.reduce((accumulator, product) => (accumulator + product.price), 0)
        newCart.totalQuantity = newCart.products.length;
        dispatchCart({type: 'set', payload: newCart});
        setLocalCart(newCart);
    }

    const removeFromCart = (indexInCart) => {
        let newCart = getLocalCart() || initialState.cartState;
        newCart.products = newCart.products.filter((product, index) => index !== indexInCart);
        newCart.total = newCart.products.reduce((accumulator, product) => (accumulator + product.price), 0)
        newCart.totalQuantity = newCart.products.length;
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

    const state = {
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
        <RootContext.Provider value={state}>
            {children}
        </RootContext.Provider>
    )
};