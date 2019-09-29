export const mapConfig = {
    center: [56.326887, 44.005986],
    zoom: 11
};

export function getColor() {
    return "#" + Math.random().toString(16).slice(2, 8);
}

export function authHeader() {
    return {
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Basic dXNlcjpwYXNzd29yZA=='
    };
}