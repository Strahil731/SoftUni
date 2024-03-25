import { post } from "./requester.js";

const links = {
    login: "http://localhost:3030/users/login",
    register: "http://localhost:3030/users/register",
    logout: "http://localhost:3030/users/logout"
}

async function login(data) {
    return await post(links.login, data);
}

async function register(data) {
    return await post(links.register, data);
}

async function logout() {
    return await get(links.logout);
}

export { login, register, logout };