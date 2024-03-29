import { get, post } from "./requester.js";

const userLinks = {
    login: "/users/login",
    register: "/users/register",
    logout: "/users/logout"
}

async function login(data) {
    return await post(userLinks.login, data);
}

async function register(data) {
    return await post(userLinks.register, data);
}

async function logout() {
    return await get(userLinks.logout);
}

export { login, register, logout }