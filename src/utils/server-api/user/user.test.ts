import {getUser, getUsers, loginUser, registerUser, updateUser} from "./user";

describe('Get users', () => {
    test('Clean query', async () => {
        const result = await getUsers();
        expect(result).toMatchObject({
            "users": expect.any(Array),
            "total": expect.any(Number),
            "skip": expect.any(Number),
            "limit": expect.any(Number),
        })
    })
})

describe('Get single user', () => {
    test('Valid data', async () => {
        const result = await getUser(1);
        expect(result).toMatchObject({
            "id": expect.any(Number),
            "email": expect.any(String),
            "username": expect.any(String),
            "password": expect.any(String),
        })
    })
    test('Invalid data', async () => {
        const result = await getUser(-1);
        expect(result).toMatchObject({
            "message": expect.any(String),
        })
    })
})

describe('Register user', () => {
    test('Valid data', async () => {
        const result = await registerUser('some-username', 'some-email', 'some-password');
        expect(result).toEqual(expect.any(Object))
        expect(result).toMatchObject({
            "username": "some-username",
            "email": "some-email",
            "password": "some-password",
        })
    })
    test('Invalid data', async () => {
        const result = await registerUser('some-username', '', '');
        expect(result).toEqual(expect.any(Object))
    })
})

describe('Login user', () => {
    test('Valid credentials', async () => {
        const result = await loginUser('kminchelle', '0lelplR');
        expect(result).toEqual(expect.objectContaining({
            "id": expect.any(Number),
            "username": expect.any(String),
            "email": expect.any(String),
            "firstName": expect.any(String),
            "lastName": expect.any(String),
            "gender": expect.any(String),
            "image": expect.any(String),
            "token": expect.any(String),
        }))
    })
    test('Invalid credentials', async () => {
        const result = await loginUser('kminchelle', 'LOLOLO');
        expect(result).toEqual(expect.objectContaining({
            "message": expect.any(String)
        }))
    })
})

describe('Update user', () => {
    test('PUT any data', async () => {
        const result = await updateUser(1, {'age': Math.floor(Math.random() * 100)});
        expect(result).toEqual(expect.any(Object))
    })
})