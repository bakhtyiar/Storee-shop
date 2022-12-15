export const capitalizeStr = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const replaceDashToSpace = (str) => {
    return str.replace(/-+/g, ' ');
}