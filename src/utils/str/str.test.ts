import {capitalizeStr, replaceDashToSpace} from "./str";

describe('Capitalize first symbol of the string', () => {
    test('input str, first goes letter', () => {
        expect(capitalizeStr('text 123')).toBe('Text 123')
    })
    test('input str, first goes digit', () => {
        expect(capitalizeStr('7text 123')).toBe('7text 123')
    })
})

describe('Replace dashes to spaces in the str', () => {
    test('input only dashes', () => {
        expect(replaceDashToSpace('hey-hello')).toBe('hey hello')
        expect(replaceDashToSpace('hey-hello-')).toBe('hey hello ')
        expect(replaceDashToSpace('----hey----hello----')).toBe(' hey hello ')
    })
    test('input no dashes', () => {
        expect(replaceDashToSpace('hey hello')).toBe('hey hello')
        expect(replaceDashToSpace('hey hello ')).toBe('hey hello ')
        expect(replaceDashToSpace('    hey    hello    ')).toBe('    hey    hello    ')
    })
})