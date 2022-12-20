import {getCookie} from "../cookies/cookies";

export default function authHeader() {
    // const { token } = JSON.parse(localStorage.getItem('user'));
    const token = getCookie('auth-token');

    if (token !== undefined && token !== 'undefined') {
        return {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        };
    } else {
        return {'Content-Type': 'application/json',};
    }
}