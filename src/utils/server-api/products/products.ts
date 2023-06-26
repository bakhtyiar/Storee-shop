import {dummyjsonURL, pageLimit} from "../../constants";
import {ICategories, IProduct, IProducts} from "./products.types";

export const getProducts = async (skip: number = 0, limit: number = pageLimit, category: string = 'tops', url: string = dummyjsonURL): Promise<IProducts> => {
    if (category !== '') {
        category = `/category/${category}`;
    }
    let res;
    try {
        res = await fetch(`${url}/products${category}?skip=${skip}&limit=${limit}`);
        res = await res.json();
    } catch (e) {
        if (typeof e === "string") {
            throw new Error(e);
        } else if (e instanceof Error) {
            throw e;
        }
    }
    return res;
};

export const getProduct = async (id: any, url = dummyjsonURL): Promise<IProduct> => {
    let res;
    try {
        res = await fetch(`${url}/products/${id}`);
        res = await res.json();
    } catch (e) {
        if (typeof e === "string") {
            throw new Error(e);
        } else if (e instanceof Error) {
            throw e;
        }
    }
    return res;
};

export const getCategories = async (url: string = dummyjsonURL): Promise<ICategories> => {
    let res;
    try {
        res = await fetch(`${url}/products/categories`);
        res = await res.json();
    } catch (e) {
        if (typeof e === "string") {
            throw new Error(e);
        } else if (e instanceof Error) {
            throw e;
        }
    }
    return res;
};