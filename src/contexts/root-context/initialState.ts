import {IRootContext} from "./initialState.types";

export const initialState: IRootContext = {
    authUserState: {
        isLoggedIn: false,
        id: -1,
        username: '',
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        gender: '',
        image: '',
        token: '',
        maidenName: '',
        age: -1,
        phone: '',
        birthDate:'',
        bloodGroup: '',
        height: -1,
        weight: -1,
        eyeColor: '',
        hair: {
            color: '',
            type: '',
        },
        domain: '',
        ip: '',
        address: {
            address: '',
            city: '',
            coordinates: {
                lat: -1,
                lng: -1
            },
            postalCode: '',
            state: '',
        },
        macAddress: '',
        university: '',
        bank: {
            cardExpire: '',
            cardNumber: '',
            cardType: '',
            currency: '',
            iban: '',
        },
        company: {
            address: {
                address: '',
                city: '',
                coordinates: {
                    lat: -1,
                    lng: -1
                },
                postalCode: '',
                state: '',
            },
            department: '',
            name: '',
            title: '',
        },
        ein: '',
        ssn: '',
        userAgent: '',
        onLogin: () => {
        },
        onLogout: () => {
        },
    },
    themeState: {
        isDark: false,
        onSwitchTheme: () => {
        },
    },
    cartState: {
        id: -1,
        products: [],
        total: 0,
        discountedTotal: 0,
        userId: 0,
        totalProducts: 0,
        totalQuantity: 0,
        onAddToCart: () => {
        },
        onRemoveFromCart: () => {
        },
        onCleanCart: () => {
        },
        onSetCart: () => {
        },
        onUpdateQuantity: () => {
        },
    },
};