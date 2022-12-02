import {dummyjsonURL, pageLimit} from './constants';

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

export const getUsers = async (query, url = dummyjsonURL) => {
    return (fetch(`${url}/users/search?q=${query}`)
        .catch(e => console.log(e))
        .then(response => response.json()))
}

export const getUser = async (id, url = dummyjsonURL) => {
    return (fetch(`${url}/users/${id}`)
        .catch(e => console.log(e))
        .then(response => response.json()))
}

export const registerUser = async (username, email, password, url = dummyjsonURL) => {
    return (fetch(`${url}/users/add`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'username': username,
                'email': email,
                'password': password,
                /* other user data */
            })
        })
            .then(res => res.json())
    )
}

export const loginUser = async (username, password, url = dummyjsonURL) => {
    return (
        fetch(`${url}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({

                'username': username,
                'password': password,
                // expiresInMins: 60, // optional
            })
        })
            .then(res => res.json())
    )
}

export const capitalizeStr = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const replaceDashToSpace = (str) => {
    return str.replace(/-+/g, ' ');
}