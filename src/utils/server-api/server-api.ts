import {getCookie} from "../cookies/cookies";
import {authKey} from "../constants";
// import {userKey} from "../constants";

export default function authHeader() {
    // const { token } = JSON.parse(localStorage.getItem(userKey));
    const token = getCookie(authKey);

    if (token !== undefined && token !== 'undefined') {
        return {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        };
    } else {
        return {'Content-Type': 'application/json',};
    }
}