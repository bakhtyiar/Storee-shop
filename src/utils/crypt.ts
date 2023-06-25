import {encryptKey} from "./constants";
const CryptoJS = require("crypto-js");

export const encryptText = (text, key = encryptKey) => {
    const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(text), key).toString();
    return (ciphertext);
}

export const decryptText = (ciphertext, key = encryptKey) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, key);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return (originalText);
}

export const encryptObject = (data, key = encryptKey) => {
    const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
    return (ciphertext);
}

export const decryptObject = (data, key = encryptKey) => {
    const bytes  = CryptoJS.AES.decrypt(data, key);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return (decryptedData);
}