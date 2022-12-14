import React, {useReducer, useState} from "react";
import {initialState} from "./initialState";
import {authUserReducer} from "./authUserReducer";
import {cartReducer} from "./cartReducer";
import {deleteCookie, setCookie} from "../../utils/cookies/cookies";
import {getProduct} from "../../utils/server-api/products/products";
import {getLocalCart, setLocalCart, updateCart} from "../../utils/server-api/cart/cart";

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
        setCookie('auth-token', serverResponse.token, {path: '/', 'max-age': 36000, secure: true, samesite: 'strict'});
        // setCookie('jwt-token', serverResponse.token, {path: '/', 'max-age': 36000, secure: true, samesite: 'strict', httpOnly: true});
        delete serverResponse.token;
        dispatchAuthUser({type: 'login', payload: serverResponse});
    }

    const logoutUser = () => {
        deleteCookie('user');
        deleteCookie('auth-token');
        dispatchAuthUser({type: 'logout'});
    }

    const addToCart = async (productId) => {
        let newCart = getLocalCart() || initialState.cartState;
        let productIndex = newCart.products.findIndex((product) => product.id === productId);
        if (productIndex !== -1) {
            newCart.products[productIndex].quantity += 1;
        } else {
            let newProduct = await getProduct(productId);
            newCart.products.push(newProduct);
        }
        if (authUser.isLoggedIn) {
            newCart = await updateCart(cart.id, newCart.products);
        } else {
            newCart.total = newCart.products.reduce((accumulator, product) => (accumulator + product.price), 0)
            newCart.discountedTotal = newCart.products.reduce((accumulator, product) => (accumulator + product.discountedTotal), 0) || newCart.total;
            newCart.totalProducts = newCart.products.length;
            newCart.totalQuantity = newCart.products.reduce((accumulator, product) => (accumulator + product.quantity), 0) || newCart.totalProducts;
        }
        dispatchCart({type: 'set', payload: newCart});
        setLocalCart(newCart);
    }

    const updateProductQuantity = async (productId, quantity) => {
        let newCart = getLocalCart() || initialState.cartState;
        let productIndex = newCart.products.findIndex( (product) => product.id === productId);
        newCart.products[productIndex].quantity = quantity;
        if (authUser.isLoggedIn) {
            newCart = await updateCart(cart.id, newCart.products);
        } else {
            newCart.total = newCart.products.reduce((accumulator, product) => (accumulator + product.price), 0)
            newCart.discountedTotal = newCart.products.reduce((accumulator, product) => (accumulator + product.discountedTotal), 0) || newCart.total;
            newCart.totalProducts = newCart.products.length;
            newCart.totalQuantity = newCart.products.reduce((accumulator, product) => (accumulator + product.quantity), 0) || newCart.totalProducts;
        }
        dispatchCart({type: 'set', payload: newCart});
        setLocalCart(newCart);
    }

    const removeFromCart = async (indexInCart) => {
        let newCart = getLocalCart() || initialState.cartState;
        newCart.products = newCart.products.filter((product, index) => index !== indexInCart);
        if (authUser.isLoggedIn) {
            newCart = await updateCart(cart.id, newCart.products);
        } else {
            newCart.total = newCart.products.reduce((accumulator, product) => (accumulator + product.price), 0)
            newCart.discountedTotal = newCart.products.reduce((accumulator, product) => (accumulator + product.discountedTotal), 0) || newCart.total;
            newCart.totalProducts = newCart.products.length;
            newCart.totalQuantity = newCart.products.reduce((accumulator, product) => (accumulator + product.quantity), 0) || newCart.totalProducts;
        }
        dispatchCart({type: 'set', payload: newCart});
        setLocalCart(newCart);
    }

    const cleanCart = async () => {
        dispatchCart({type: 'clean'});
        if (authUser.isLoggedIn) {
            await updateCart(cart.id, []);
        }
        setLocalCart(initialState.cartState);
    }

    const setCart = async (newCart) => {
        if (authUser.isLoggedIn) {
            await updateCart(cart.id, newCart.products);
        }
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
            onUpdateQuantity: updateProductQuantity,
        },
    };

    return (
        <RootContext.Provider value={state}>
            {children}
        </RootContext.Provider>
    )
};