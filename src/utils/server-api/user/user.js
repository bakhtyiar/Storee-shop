import {dummyjsonURL} from "../../constants";
import authHeader from "../server-api";

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
            headers: authHeader(),
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
            headers: authHeader(),
            body: JSON.stringify({

                'username': username,
                'password': password,
                // expiresInMins: 60, // optional
            })
        })
            .then(res => res.json())
    )
}