import React, {useReducer, useState} from "react";
import {initialState} from "./initialState";
import {authUserReducer} from "./authUserReducer";
import {cartReducer} from "./cartReducer";
import {deleteCookie, setCookie} from "../../utils/cookies/cookies";
import {getProduct} from "../../utils/server-api/products/products";
import {getLocalCart, setLocalCart, updateCart} from "../../utils/server-api/cart/cart";
import {authKey, userKey} from "../../utils/constants";
import {cartCalcCounters} from "../../utils/calcs";

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
        setCookie(userKey, serverResponse.id, {path: '/', 'max-age': 36000, secure: true, samesite: 'lax'});
        setCookie(authKey, serverResponse.token, {path: '/', 'max-age': 36000, secure: true, samesite: 'strict'});
        delete serverResponse.token;
        dispatchAuthUser({type: 'login', payload: serverResponse});
    }

    const logoutUser = () => {
        deleteCookie(userKey);
        deleteCookie(authKey);
        dispatchAuthUser({type: 'logout'});
    }

    const addToCart = async (productId) => {
        let newCart = getLocalCart() || initialState.cartState;
        let productIndex = newCart.products.findIndex((product) => product.id === productId);
        if (productIndex === -1) {
            let newProduct = await getProduct(productId);
            newProduct.quantity = 1;
            newCart.products.push(newProduct);
        } else {
            newCart.products[productIndex].quantity += 1;
        }
        if (authUser.isLoggedIn) {
            newCart = await updateCart(cart.id, newCart.products);
        } else {
            newCart = cartCalcCounters(newCart);
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
            newCart = cartCalcCounters(newCart);
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
            newCart = cartCalcCounters(newCart);
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
            maidenName: authUser.maidenName,
            age: authUser.age,
            phone: authUser.phone,
            birthDate:authUser.birthDate,
            bloodGroup: authUser.bloodGroup,
            height: authUser.height,
            weight: authUser.weight,
            eyeColor: authUser.eyeColor,
            hair: {
                color: authUser.hair.color,
                type: authUser.hair.type,
            },
            domain: authUser.domain,
            ip: authUser.ip,
            address: {
                address: authUser.address.address,
                city: authUser.address.city,
                coordinates: {
                    lat: authUser.address.coordinates.lat,
                    lng: authUser.address.coordinates.lng
                },
                postalCode: authUser.address.postalCode,
                state: authUser.address.state,
            },
            macAddress: authUser.macAddress,
            university: authUser.university,
            bank: {
                cardExpire: authUser.bank.cardExpire,
                cardNumber: authUser.bank.cardNumber,
                cardType: authUser.bank.cardType,
                currency: authUser.bank.currency,
                iban: authUser.bank.iban,
            },
            company: {
                address: {
                    address: authUser.company.address.address,
                    city: authUser.company.address.city,
                    coordinates: {
                        lat: authUser.company.address.coordinates.lat,
                        lng: authUser.company.address.coordinates.lng,
                    },
                    postalCode: authUser.company.address.postalCode,
                    state: authUser.company.address.state,
                },
                department: authUser.company.department,
                name: authUser.company.name,
                title: authUser.company.title,
            },
            ein: authUser.ein,
            ssn: authUser.ssn,
            userAgent: authUser.userAgent,
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
