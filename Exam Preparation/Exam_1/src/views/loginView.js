import { login } from "../api/userService.js";
import { setUser } from "../utils/userUtils.js";

const loginSection = document.getElementById("login");
const loginForm = document.querySelector(".login-form");
loginForm.addEventListener("submit", onLogin);

let ctx = null;

export function showLogin(context) {
    ctx = context;
    ctx.render(loginSection);
}

async function onLogin(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
        return alert("Wrond email or password!");
    }

    const userData = await login({ email, password });
    setUser(userData);
    ctx.updateNav();
    ctx.goTo("/home");
    loginForm.reset();
}