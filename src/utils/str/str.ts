export const capitalizeStr = (str) => {
    if (typeof str !== 'string') {
        throw new TypeError('Passed argument must be a string');
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const replaceDashToSpace = (str) => {
    return str.replace(/-+/g, ' ');
}