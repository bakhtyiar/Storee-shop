export interface IUsers {
    "users": IUser[],
    "total": number,
    "skip": number,
    "limit": number
}

export interface IUserAuth {
    "id": number,
    "username": string,
    "email": string,
    "firstName": string,
    "lastName": string,
    "gender": string,
    "image": string,
    "token": string
}

export interface IUserRegister {
    "username": string,
    "email": string,
    "password": string,
}

export interface IErrorResponse {
    "message": string;
}

export interface IUser extends IUserRegister {
    "id": number,
    "firstName"?: string,
    "lastName"?: string,
    "maidenName"?: string,
    "age"?: number,
    "gender"?: string,
    "phone"?: string,
    "birthDate"?: string,
    "image"?: string,
    "bloodGroup"?: string,
    "height"?: number,
    "weight"?: number,
    "eyeColor"?: string,
    "hair"?: {
        "color"?: string,
        "type"?: string
    },
    "domain": string,
    "ip": string,
    "address"?: {
        "address": string,
        "city": string,
        "coordinates": {
            "lat": number,
            "lng": number
        },
        "postalCode": string,
        "state": string
    },
    "macAddress": string,
    "university"?: string,
    "bank"?: {
        "cardExpire": string,
        "cardNumber": string,
        "cardType": string,
        "currency": string,
        "iban": string
    },
    "company"?: {
        "address": {
            "address": string,
            "city": string,
            "coordinates": {
                "lat": number
                "lng": number
            },
            "postalCode": string,
            "state": string
        },
        "department": string,
        "name": string,
        "title": string
    },
    "ein"?: string,
    "ssn"?: string,
    "userAgent": string
}