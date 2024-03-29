import { login } from "../services/userService.js";
import { setUser } from "../utils/userHelper.js";

const loginSection = document.getElementById("login");
const loginForm = document.querySelector(".login-form");
loginForm.addEventListener("submit", onLogin);

const convertToRegister = document.querySelector(".login-form p a");
convertToRegister.addEventListener("click", (event) => {
    event.preventDefault();
    ctx.goTo("/register")
});

let ctx = null;


export function showLogin(context) {
    ctx = context;
    ctx.render(loginSection, "");
}

async function onLogin(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
        return alert("Wrong email or password!");
    }

    const userData = await login({ email, password });
    setUser(userData);
    ctx.updateNav();
    ctx.goTo("/");
    loginForm.reset();
}