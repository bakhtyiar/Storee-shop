import {decryptText, encryptText} from "../crypt";
import {ICookieOptions} from "./cookies.types";

export const getCookie = (name: any) => {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decryptText(decodeURIComponent(matches[1])) : undefined;
}

export const setCookie = (name: any, value: any, options: ICookieOptions = {}) => {

    value = encryptText(value);

    options = {
        path: '/',
        // при необходимости добавьте другие значения по умолчанию
        ...options
    };

    if (options.expires && options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }

    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey as keyof typeof options];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }

    document.cookie = updatedCookie;
}

export const deleteCookie = (name: any) => {
    setCookie(name, "", {
        'max-age': -1
    })
}