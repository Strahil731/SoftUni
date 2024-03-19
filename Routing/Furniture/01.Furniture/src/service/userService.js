import { api } from "../requester.js";

const BASE_URL = "http://localhost:3030/";

const endPoints = {
    login: "users/login",
    register: "users/register",
    logout: "users/logout"
}

async function loginFn(data) {
    return await api.post(BASE_URL + endPoints.login, data);
}

async function registerFn(data) {
    return await api.post(BASE_URL + endPoints.register, data);
}

async function logoutFn() {
    return await api.get(BASE_URL + endPoints.logout);
}

export const userService = { loginFn, registerFn, logoutFn }