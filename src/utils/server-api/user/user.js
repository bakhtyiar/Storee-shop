import {dummyjsonURL} from "../../constants";
import authHeader from "../server-api";
import deepmerge from "deepmerge";

export const getUsers = async (query, url = dummyjsonURL) => {
    let res;
    try {
        res = await fetch(`${url}/users/search?q=${query}`);
        res = await res.json();
    } catch (error) {
        throw new Error(error);
    }
    return res;
}

export const getUser = async (id, url = dummyjsonURL) => {
    let res;
    try {
        res = await fetch(`${url}/users/${id}`);
        res = await res.json();
    } catch (error) {
        throw new Error(error);
    }
    return res;
}

export const registerUser = async (username, email, password, url = dummyjsonURL) => {
    let res;
    try {
        res = await fetch(`${url}/users/add`, {
            method: 'POST',
            headers: authHeader(),
            body: JSON.stringify({
                'username': username,
                'email': email,
                'password': password,
                /* other user data */
            })
        })
        res = await res.json();
    } catch (error) {
        throw new Error(error);
    }
    return (res);
}

export const loginUser = async (username, password, url = dummyjsonURL) => {
    let auth;
    try {
        auth = await fetch(`${url}/auth/login`, {
            method: 'POST',
            headers: authHeader(),
            body: JSON.stringify({

                'username': username,
                'password': password,
                // expiresInMins: 60, // optional
            })
        });
        auth = await auth.json();
    } catch (error) {
        throw new Error(error);
    }
    let personalData;
    try {
        personalData = await fetch(`${url}/users/${auth.id}`);
        personalData = await personalData.json();
    } catch (error) {
        throw new Error(error);
    }

    const data = deepmerge(auth, personalData);
    return (data);
}

export const updateUser = async (userId, data, url = dummyjsonURL) => {
    let response;
    try {
        response = await fetch(`${url}/users/${userId}`, {
            method: 'PUT', /* or PATCH */
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...data,
            })
        })
        response = await response.json();
    } catch (error) {
        throw new Error(error);
    }
    return (response);
}