import { post } from "./request.js";
import { createSubmitHandler, saveUserData } from "./util.js";

export function showLohinPage() {
    document.querySelectorAll("section").forEach(s => s.style.display = "none");
    document.getElementById("login-page").style.display = "block";
}

start();

function start() {
    const form = document.getElementById("login-form");
    form.addEventListener("submit", createSubmitHandler(onLogin));
}

async function onLogin({email, password}) {
    const URL = "http://localhost:3030/users/login";

    const userData = await post(URL, { email, password });
    saveUserData(userData);

    window.location = "/";
}