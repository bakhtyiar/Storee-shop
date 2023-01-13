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

    return (auth);
}