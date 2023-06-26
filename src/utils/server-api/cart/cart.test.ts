import {getCart, getLocalCart, setLocalCart, updateCart} from "./cart";

class LocalStorageMock {
    store: any;
    constructor() {
        this.store = {};
    }

    clear() {
        this.store = {};
    }

    getItem(key: any) {
        return this.store[key] || null;
    }

    setItem(key: any, value: any) {
        this.store[key] = String(value);
    }

    removeItem(key: any) {
        delete this.store[key];
    }
}

const nativeLocalStorage = global.localStorage;

const mockData = {
    "id": 19,
    "products": [{
            "id": 43,
            "title": "frock gold printed",
            "price": 600,
            "quantity": 3,
            "total": 1800,
            "discountPercentage": 15.55,
            "discountedPrice": 1520
        }, {
            "id": 77,
            "title": "Rose Ring",
            "price": 100,
            "quantity": 3,
            "total": 300,
            "discountPercentage": 3.22,
            "discountedPrice": 290
        }, {
            "id": 50,
            "title": "Women Shoes",
            "price": 36,
            "quantity": 3,
            "total": 108,
            "discountPercentage": 16.87,
            "discountedPrice": 90
        }, {
            "id": 31,
            "title": "Mornadi Velvet Bed",
            "price": 40,
            "quantity": 2,
            "total": 80,
            "discountPercentage": 17,
            "discountedPrice": 66
        }, {
            "id": 75,
            "title": "Seven Pocket Women Bag",
            "price": 68,
            "quantity": 3,
            "total": 204,
            "discountPercentage": 14.87,
            "discountedPrice": 174
        }],
    "total": 2492,
    "discountedTotal": 2140,
    "userId": 5,
    "totalProducts": 5,
    "totalQuantity": 14,
};

describe('Get single cart', () => {
    beforeAll(() => {
        Object.defineProperty(global, 'localStorage', {
            value: new LocalStorageMock()
        });
    });
    afterAll(() => {
        Object.defineProperty(global, 'localStorage', {
            value: nativeLocalStorage
        });
    });
    test('Valid data', async () => {
        const result = await getCart(1);
        expect(result).toEqual(expect.any(Object))
        expect(result).toMatchObject({
            "total": expect.any(Number),
        })
    })
    test('Invalid data', async () => {
        const result = await getCart(-1);
        expect(result).toMatchObject({
            "message": expect.any(String),
        })
    })
})

describe('Update single cart', () => {
    beforeAll(() => {
        Object.defineProperty(global, 'localStorage', {
            value: new LocalStorageMock()
        });
    });
    afterAll(() => {
        Object.defineProperty(global, 'localStorage', {
            value: nativeLocalStorage
        });
    });
    test('Valid data', async () => {
        const result = await updateCart(1, []);
        expect(result).toMatchObject({
            "id": expect.any(Number),
            "products": expect.any(Array),
            "total": expect.any(Number),
            "discountedTotal": expect.any(Number),
            "userId": expect.any(Number),
            "totalProducts": expect.any(Number),
            "totalQuantity": expect.any(Number),
        })
    })
    test('Invalid data', async () => {
        const result = await updateCart(-1, []);
        expect(result).toMatchObject({
            "message": expect.any(String),
        })
    })
})

describe('Get & Set local cart', () => {
    beforeAll(() => {
        Object.defineProperty(global, 'localStorage', {
            value: new LocalStorageMock()
        });
    });
    afterAll(() => {
        Object.defineProperty(global, 'localStorage', {
            value: nativeLocalStorage
        });
    });
    beforeEach(() => {
        localStorage.clear()
    })
    test('Empty storage', () => {
        const result = getLocalCart();
        expect(result).toBeNull()
    })
    test('Not empty storage', () => {
        setLocalCart(mockData)
        const result = getLocalCart();
        expect(result).toMatchObject({
            "id": expect.any(Number),
            "products": expect.any(Array),
            "total": expect.any(Number),
            "discountedTotal": expect.any(Number),
            "userId": expect.any(Number),
            "totalProducts": expect.any(Number),
            "totalQuantity": expect.any(Number),
        })
    })
})