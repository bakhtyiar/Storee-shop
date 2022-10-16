import {dummyjsonURL, pageLimit} from './constants';

export const getData = async (skip = 0, limit = pageLimit, url = dummyjsonURL) => {
	return (fetch(`${url}?skip=${skip}&limit=${limit}`) 
	.catch(e => console.log(e))
	.then(response => response.json())
	.then(data => {
		console.log(data);
		return data;
	}))
};