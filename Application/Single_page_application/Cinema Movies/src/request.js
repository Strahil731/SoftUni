import { clearUserData, getUserData } from "./util.js";

export async function request(method, URL, data) {
    const option = {
        method,
        headers: {}
    };

    const userData = getUserData();

    if (userData) {
        option.headers["X-Authorization"] = userData.accessToken;
    }

    if (data !== undefined) {
        option.headers["Content-Type"] = "application/json";
        option.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(URL, option);

        if (!response.ok) {
            const error = await response.json();

            if (userData && error.code === 403) {
                clearUserData();
            }
            throw new Error(error.message);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        alert(error.message);
    }
}

export const get = (URL) => request("get", URL);
export const post = (URL, data) => request("post", URL, data);
export const put = (URL, data) => request("put", URL, data);
export const patch = (URL, data) => request("patch", URL, data);
export const del = (URL) => request("delete", URL);