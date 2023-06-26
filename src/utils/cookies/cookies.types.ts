export interface ICookieOptions {
    path?: string,
    domain?: string,
    expires?: Date | string,
    "max-age"?: number,
    secure?: boolean,
    samesite?: 'strict'|'lax'|'none',
}