import {dummyjsonURL} from "../../constants";
import authHeader from "../server-api";

export const getCart = (userId, url = dummyjsonURL) => {
    return (
        fetch(`${url}/carts/user/${userId}`)
            .then(res => res.json())
            .then(data => data.carts[0])
    );
}

export const updateCart = (cartId, products, url = dummyjsonURL) => {
    return (
        fetch(`${url}/carts/${cartId}`, {
            method: 'PUT', /* or PATCH */
            headers: authHeader(),
            body: JSON.stringify({
                merge: false, // include existing products in the cart
                products: [
                    ...products,
                ],
            })
        })
            .then(res => res.json())
    );
}

export const getLocalCart = () => {
    const cart = localStorage.getItem('cart');
    if (cart === 'undefined' || cart === undefined) {
        return null;
    }
    return (JSON.parse(cart));
}

export const setLocalCart = (cart) => {
    return (localStorage.setItem('cart', JSON.stringify(cart)));
}