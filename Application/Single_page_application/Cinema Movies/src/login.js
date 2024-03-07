import { request } from "./request.js";

export function showLohinPage() {
    document.querySelectorAll("section").forEach(s => s.style.display = "none");
    document.getElementById("login-page").style.display = "block";
}

start();

function start() {
    const form = document.getElementById("login-form");
    form.addEventListener("submit", onLogin);
}

async function onLogin(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.entries(formData.entries());

    const email = data.email;
    const password = data.password;

    const URL = "http://localhost:3030/users/login";

    try {
        const response = await fetch(URL, {
            method: "POST",
            headers: {
                "content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }

        const userData = await response.json();
        localStorage.setItem("user", JSON.stringify(userData));

        window.location = '/';
    } catch (error) {
        alert(error.message);
    }
}