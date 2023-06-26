import {dummyjsonURL} from "../../constants";
import authHeader from "../server-api";
import deepmerge from "deepmerge";
import {IErrorResponse, IUser, IUserAuth, IUserRegister, IUsers} from "./user.types";

export const getUsers = async (query: string = '', url:string = dummyjsonURL): Promise<IUsers> => {
    let res;
    try {
        res = await fetch(`${url}/users/search?q=${query}`);
        res = await res.json();
    } catch (e: any) {
        if (typeof e === "string") {
            throw new Error(e);
        } else if (e instanceof Error) {
            throw e;
        }
    }
    return res;
}

export const getUser = async (id: string|number, url: string = dummyjsonURL): Promise<IUser> => {
    let res;
    try {
        res = await fetch(`${url}/users/${id}`);
        res = await res.json();
    } catch (e: any) {
        if (typeof e === "string") {
            throw new Error(e);
        } else if (e instanceof Error) {
            throw e;
        }
    }
    return res;
}

export const registerUser = async (username: string, email: string, password: string, url: string = dummyjsonURL): Promise<IUserRegister|IErrorResponse> => {
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
        if ('message' in res) {
            throw new Error(res.message)
        }
    } catch (e) {
        if (typeof e === "string") {
            throw new Error(e);
        } else if (e instanceof Error) {
            throw e;
        }
    }
    return (res);
}

export const loginUser = async (username: string, password: string, url: string = dummyjsonURL): Promise<IUserAuth & IUser> => {
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
        if ('message' in auth) {
            throw new Error(auth.message)
        }
    } catch (e) {
        if (typeof e === "string") {
            throw new Error(e);
        } else if (e instanceof Error) {
            throw e;
        }
    }
    let personalData;
    try {
        personalData = await fetch(`${url}/users/${auth.id}`);
        personalData = await personalData.json();
        if ('message' in personalData) {
            throw new Error(personalData.message)
        }
    } catch (e) {
        if (typeof e === "string") {
            throw new Error(e);
        } else if (e instanceof Error) {
            throw e;
        }
    }

    const data: IUserAuth & IUser = deepmerge(auth, personalData);
    return (data);
}

export const updateUser = async (userId: string|number, data: Partial<IUser>, url: string = dummyjsonURL): Promise<IUser> => {
    let res;
    try {
        res = await fetch(`${url}/users/${userId}`, {
            method: 'PUT', /* or PATCH */
            headers: authHeader(),
            body: JSON.stringify({
                ...data,
            })
        })
        res = await res.json();
    } catch (e) {
        if (typeof e === "string") {
            throw new Error(e);
        } else if (e instanceof Error) {
            throw e;
        }
    }
    return (res);
}