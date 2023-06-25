import {decryptText, encryptText} from "./crypt";

const someRandomValue = 'someRandomValue';

describe('Encryption of text', () => {
    test('Encrypt and decrypt text', () => {
        const encryptedText = encryptText(someRandomValue)
        const decryptedText = decryptText(encryptedText)
        console.log('Input', `\"${someRandomValue}\"`);
        console.log('Encrypted', `\"${encryptedText}\"`);
        console.log('Decrypted', decryptedText);
        expect(decryptedText).toEqual(`\"${someRandomValue}\"`);
    })
})