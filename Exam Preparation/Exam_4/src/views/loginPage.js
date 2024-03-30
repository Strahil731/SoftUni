import { login } from "../services/userService.js";
import { getUser, setUser } from "../utils/userHelper.js";
import { showError } from "./errorMessage.js";

const loginSection = document.getElementById("login");
const loginForm = document.querySelector(".login-form");
loginForm.addEventListener("submit", onLogin);

const convertToRegister = document.querySelector(".login-form p a");
convertToRegister.addEventListener("click", (event) => {
    event.preventDefault();
    ctx.goTo("/register");
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
        return alert("Wrond email or password!");
    }

    const userData = await login({ email, password });

    if (userData.status === "fail") {
        showError(ctx, userData.error);
        return;
    }
    else {
        setUser(userData);
        ctx.updateNav();
        ctx.goTo("/");
        loginForm.reset();
    }
}