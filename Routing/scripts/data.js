const appID = '76556FDA-72BF-B691-FF68-4E3534CEA700';
const apiKey = 'EF8C3AF4-5BB3-4EE5-8269-181DAC7D9205';

function host(endpoint) {
    return `https://api.backendless.com/${appID}/${apiKey}/${endpoints}`;
};

const endpoints = {
    REGISTER: 'users/register',
    LOGIN: 'users/login',

};

export async function register(username, password) {
    return (await fetch(host(endpoints.REGISTER), {
        method: 'POST',

        headers: {
            'Content-Type': 'application/json'
        },
        body: Json.stringify({
            username,
            password
        })
    })).json();

};

export async function login(username, password) {
    return (await fetch(host(endpoints.LOGIN), {
        method: 'POST',

        headers: {
            'Content-Type': 'application/json'
        },
        body: Json.stringify({
            login: username,
            password
        })
    }));


};