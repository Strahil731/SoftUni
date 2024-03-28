import { getUser, removeUser } from "../utils/userHelper.js";

const BASE_URL = "http://localhost:3030";

async function reqester(method, endUrl, data) {
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

        return await response.json();
    } catch (error) {
        return alert(error.message);
    }
}

async function get(url) {
    return await reqester("GET", url);
}

async function post(url, data) {
    return await reqester("POST", url, data);
}

async function update(url, data) {
    return await reqester("PUT", url, data);
}

async function del(url) {
    return await reqester("DELETE", url);
}

export { get, post, update, del }