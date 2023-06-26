import {ICart} from "./server-api/cart/cart.types";
import {IProduct} from "./server-api/products/products.types";

export const cartRecalcCounters = (cart: ICart): ICart => {
    cart.total = cart.products.reduce(
        (accumulator: number, product: IProduct) => (
            accumulator + (product.price * (product.quantity ?? 1))), 0)
    cart.discountedTotal = cart.products.reduce(
        (accumulator: any, product: any) => (
            accumulator + Math.round(product.price * ((100 - product.discountPercentage) / 100)) * product.quantity), 0);
    cart.totalProducts = cart.products.length;
    cart.totalQuantity = cart.products.reduce(
        (accumulator: any, product: any) => (
            accumulator + product.quantity), 0) || cart.totalProducts;
    return cart;
}