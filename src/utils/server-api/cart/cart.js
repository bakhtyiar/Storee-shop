import {dummyjsonURL} from "../../constants";

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
            headers: { 'Content-Type': 'application/json' },
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
    return (JSON.parse(localStorage.getItem('cart')));
}

export const setLocalCart = (cart) => {
    return (localStorage.setItem('cart', JSON.stringify(cart)));
}