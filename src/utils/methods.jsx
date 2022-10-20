import {dummyjsonURL, pageLimit} from './constants';

export const getData = async (skip = 0, limit = pageLimit, url = dummyjsonURL) => {
	return (fetch(`${url}/products?skip=${skip}&limit=${limit}`) 
	.catch(e => console.log(e))
	.then(response => response.json())
	.then(data => {
		console.log(data);
		return data;
	}))
};

export const getProduct = async (id, url = dummyjsonURL) => {
	return (fetch(`${url}/products/${id}`) 
	.catch(e => console.log(e))
	.then(response => response.json())
	.then(data => {
		console.log(data);
		return data;
	}))
};