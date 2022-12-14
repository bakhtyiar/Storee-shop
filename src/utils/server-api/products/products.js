import {dummyjsonURL, pageLimit} from "../../constants";

export const getProducts = async (skip = 0, limit = pageLimit, category = 'tops', url = dummyjsonURL) => {
    if (category !== '') {
        category = `/category/${category}`;
    }
    return (fetch(`${url}/products${category}?skip=${skip}&limit=${limit}`)
        .catch(e => console.log(e))
        .then(response => response.json()))
};

export const getProduct = async (id, url = dummyjsonURL) => {
    return (fetch(`${url}/products/${id}`)
        .catch(e => console.log(e))
        .then(response => response.json()))
};

export const getCategories = async (url = dummyjsonURL) => {
    return (fetch(`${url}/products/categories`)
        .catch(e => console.log(e))
        .then(response => response.json()))
}