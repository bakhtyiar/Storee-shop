import {deleteCookie, getCookie, setCookie} from "./cookies";
import {userKey} from "../constants";

const someValue = 'someValue';

describe('Cookies', () => {
    test('Not empty cookies', () => {
        setCookie(userKey, someValue)
        expect(getCookie(userKey)).toEqual(`\"${someValue}\"`)
    })
    test('Empty cookies', () => {
        deleteCookie(userKey);
        expect(getCookie(userKey)).toBeUndefined()
    })
})