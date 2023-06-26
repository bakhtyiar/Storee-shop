import {encryptKey} from "./constants";
const CryptoJS = require("crypto-js");

export const encryptText = (text: string, key: string = encryptKey): string => {
    const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(text), key).toString();
    return (ciphertext);
}

export const decryptText = (ciphertext: string, key: string = encryptKey): string => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, key);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return (originalText);
}

export const encryptObject = (data: Object, key: string = encryptKey): string => {
    const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
    return (ciphertext);
}

export const decryptObject = (data: string, key: string = encryptKey): Object => {
    const bytes  = CryptoJS.AES.decrypt(data, key);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return (decryptedData);
}