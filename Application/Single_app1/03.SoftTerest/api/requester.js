import { getUser, removeUser } from "../utils/userUtils.js";

const baseURL = "http://localhost:3030/";

async function requester(method, endURL, data) {
    const url = baseURL + endURL;
    const userData = getUser();

    const option = {
        method,
        headers: {}
    };

    if (userData) {
        option.headers["X-Authorization"] = userData.accessToken;
    }

    if (data) {
        option.headers["Content-Type"] = "application/json";
        option.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(url, option);

        if (!response.ok) {
            if (response.status == 403) {
                removeUser();
            }
            const error = await response.json();
            throw new Error(error.message);
        }

        if (response.status === 204) {
            return response;
        }

        return await response.json();
    } catch (error) {
        return alert(error.message);
    }
}

async function get(url) {
    return await requester("GET", url);
}

async function post(url, data) {
    return await requester("POST", url, data);
}

async function update(url, data) {
    return await requester("PUT", url, data);
}

async function del(url) {
    return await requester("DELETE", url);
}

export { get, post, update, del }