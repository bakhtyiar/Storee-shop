import {cartKey, dummyjsonURL} from "../../constants";
import authHeader from "../server-api";

export const getCart = (userId, url = dummyjsonURL) => {
    return (
        fetch(`${url}/carts/user/${userId}`)
            .then(res => res.json())
            .then(data => data.total > 0 ? data.carts[0] : data)
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
    const cart = localStorage.getItem(cartKey);
    if (cart === 'undefined' || cart === undefined) {
        return null;
    }
    return (JSON.parse(cart));
}

export const setLocalCart = (cart) => {
    return (localStorage.setItem(cartKey, JSON.stringify(cart)));
}