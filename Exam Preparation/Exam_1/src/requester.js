import { getUserData } from "./userHelper.js";

async function requester(method, url, data) {
    const option = {
        method
    };

    const userToken = getUserData();
    const headers = {
        "Content-Type": "application/json"
    };

    if (userToken) {
        headers["X-Authorization"] = userToken.accessToken;
    }

    option[headers] = headers;

    if (data) {
        option.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(url, option);

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        alert(error.message);
    }
}

const get = (url) => {
    return requester("GET", url);
}

const post = (url, data) => {
    return requester("POST", url, data);
}

const update = (url, data) => {
    return requester("PUT", url, data);
}

const del = (url) => {
    return requester("DELETE", url);
}

export { get, post, update, del }