import {dummyjsonURL, pageLimit} from "../../constants";

export const getProducts = async (skip: number = 0, limit: number = pageLimit, category: string = 'tops', url: string = dummyjsonURL):  => {
    if (category !== '') {
        category = `/category/${category}`;
    }
    return (fetch(`${url}/products${category}?skip=${skip}&limit=${limit}`)
        .catch(e => console.log(e))
        // @ts-expect-error TS(2339): Property 'json' does not exist on type 'void | Res... Remove this comment to see the full error message
        .then(response => response.json()))
};

export const getProduct = async (id: any, url = dummyjsonURL) => {
    return (fetch(`${url}/products/${id}`)
        .catch(e => console.log(e))
        // @ts-expect-error TS(2339): Property 'json' does not exist on type 'void | Res... Remove this comment to see the full error message
        .then(response => response.json()))
};

export const getCategories = async (url = dummyjsonURL) => {
    return (fetch(`${url}/products/categories`)
        .catch(e => console.log(e))
        // @ts-expect-error TS(2339): Property 'json' does not exist on type 'void | Res... Remove this comment to see the full error message
        .then(response => response.json()))
}