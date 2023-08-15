export const capitalizeStr = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export const replaceDashToSpace = (str: string): string => {
    return str.replace(/-+/g, ' ');
}