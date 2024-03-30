import { getUser, removeUser } from "../utils/userHelper.js";
import { showError } from "../views/errorMessage.js";

const BASE_URL = "http://localhost:3030";

async function requester(method, endUrl, data) {
    const url = BASE_URL + endUrl;
    const user = getUser();
    const option = {
        method,
        headers: {}
    };

    if (user) {
        option.headers["X-Authorization"] = user.accessToken;
    }

    if (data) {
        option.headers["Content-Type"] = "application/json";
        option.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(url, option);

        if (!response.ok) {
            if (response.status === 403) {
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
        return {status: "fail", error};
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