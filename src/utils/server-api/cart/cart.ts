import {cartKey, dummyjsonURL} from "../../constants";
import authHeader from "../server-api";
import {ICart} from "./cart.types";
import {IProduct} from "../products/products.types";

export const getCart = async (userId: string | number, url: string = dummyjsonURL): Promise<ICart> => {
    let res;
    try {
        res = await fetch(`${url}/carts/user/${userId}`);
        res = await res.json();
    } catch (e) {
        if (typeof e === "string") {
            throw new Error(e);
        } else if (e instanceof Error) {
            throw e;
        }
    }
    return res;
}

export const updateCart = async (cartId: string | number, products: IProduct[], url: string = dummyjsonURL): Promise<ICart> => {
    let res;
    try {
        res = await fetch(`${url}/carts/${cartId}`, {
            method: 'PUT', /* or PATCH */
            headers: authHeader(),
            body: JSON.stringify({
                merge: false, // include existing products in the cart
                products: [
                    ...products,
                ],
            })
        });
        res = await res.json();
    } catch (e) {
        if (typeof e === "string") {
            throw new Error(e);
        } else if (e instanceof Error) {
            throw e;
        }
    }
    return res;
}

export const getLocalCart = (): ICart | null => {
    const cart = localStorage.getItem(cartKey);
    if (cart !== null && cart !== 'undefined' && cart !== undefined) {
        return (JSON.parse(cart));
    }
    return null;
}

export const setLocalCart = (cart: any): void => {
    return (localStorage.setItem(cartKey, JSON.stringify(cart)));
}