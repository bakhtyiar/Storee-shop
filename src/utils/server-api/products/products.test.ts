import {getCategories, getProduct, getProducts} from "./products";

describe('Get products', () => {
    test('Clean query', async () => {
        const result = await getProducts();
        expect(result).toMatchObject({
            "products": expect.any(Array),
            "total": expect.any(Number),
            "skip": expect.any(Number),
            "limit": expect.any(Number),
        })
    })
})

describe('Get single product', () => {
    test('Valid input', async () => {
        const result = await getProduct(1);
        expect(result).toMatchObject({
            "id": expect.any(Number),
            "title": expect.any(String),
            "description": expect.any(String),
            "price": expect.any(Number),
            "discountPercentage": expect.any(Number),
            "rating": expect.any(Number),
            "stock": expect.any(Number),
            "brand": expect.any(String),
            "category": expect.any(String),
            "thumbnail": expect.any(String),
            "images": expect.any(Array),
        })
    })
    test('Invalid input', async () => {
        const result = await getProduct(-1);
        expect(result).toMatchObject({
            "message": expect.any(String),
        })
    })
})

describe('Get categories', () => {
    test('Clean query', async () => {
        const result = await getCategories();
        expect(result).toEqual(expect.any(Array))
    })
})