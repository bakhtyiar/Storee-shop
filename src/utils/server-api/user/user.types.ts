import {dummyjsonURL} from "../../constants";
import authHeader from "../server-api";
import deepmerge from "deepmerge";

export const getUsers = async (query: any, url = dummyjsonURL) => {
    let res;
    try {
        res = await fetch(`${url}/users/search?q=${query}`);
        res = await res.json();
    } catch (e: any) {
        throw new Error(e);
    }
    return res;
}

export const getUser = async (id: any, url = dummyjsonURL) => {
    let res;
    try {
        res = await fetch(`${url}/users/${id}`);
        res = await res.json();
    } catch (error) {
        // @ts-expect-error TS(2345): Argument of type 'unknown' is not assignable to pa... Remove this comment to see the full error message
        throw new Error(error);
    }
    return res;
}

export const registerUser = async (username: any, email: any, password: any, url = dummyjsonURL) => {
    let res;
    try {
        res = await fetch(`${url}/users/add`, {
            method: 'POST',
            // @ts-expect-error TS(2322): Type '{ Authorization: string; 'Content-Type': str... Remove this comment to see the full error message
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
        // @ts-expect-error TS(2345): Argument of type 'unknown' is not assignable to pa... Remove this comment to see the full error message
        throw new Error(error);
    }
    return (res);
}

export const loginUser = async (username: any, password: any, url = dummyjsonURL) => {
    let auth;
    try {
        auth = await fetch(`${url}/auth/login`, {
            method: 'POST',
            // @ts-expect-error TS(2322): Type '{ Authorization: string; 'Content-Type': str... Remove this comment to see the full error message
            headers: authHeader(),
            body: JSON.stringify({

                'username': username,
                'password': password,
                // expiresInMins: 60, // optional
            })
        });
        auth = await auth.json();
    } catch (error) {
        // @ts-expect-error TS(2345): Argument of type 'unknown' is not assignable to pa... Remove this comment to see the full error message
        throw new Error(error);
    }
    let personalData;
    try {
        personalData = await fetch(`${url}/users/${auth.id}`);
        personalData = await personalData.json();
    } catch (error) {
        // @ts-expect-error TS(2345): Argument of type 'unknown' is not assignable to pa... Remove this comment to see the full error message
        throw new Error(error);
    }

    const data = deepmerge(auth, personalData);
    return (data);
}

export const updateUser = async (userId: any, data: any, url = dummyjsonURL) => {
    let response;
    try {
        response = await fetch(`${url}/users/${userId}`, {
            method: 'PUT', /* or PATCH */
            // @ts-expect-error TS(2322): Type '{ Authorization: string; 'Content-Type': str... Remove this comment to see the full error message
            headers: authHeader(),
            body: JSON.stringify({
                ...data,
            })
        })
        response = await response.json();
    } catch (error) {
        // @ts-expect-error TS(2345): Argument of type 'unknown' is not assignable to pa... Remove this comment to see the full error message
        throw new Error(error);
    }
    return (response);
}