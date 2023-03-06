export const cartCalcCounters = (cart) => {
    cart.total = cart.products.reduce((accumulator, product) => (accumulator + (product.price * product.quantity)), 0)
    cart.discountedTotal = cart.products.reduce((accumulator, product) => (accumulator + Math.round(product.price * ((100 - product.discountPercentage) / 100)) * product.quantity), 0);
    cart.totalProducts = cart.products.length;
    cart.totalQuantity = cart.products.reduce((accumulator, product) => (accumulator + product.quantity), 0) || cart.totalProducts;
    return cart;
}