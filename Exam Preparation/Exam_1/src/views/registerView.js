import { register } from "../api/userService.js";
import { setUser } from "../utils/userUtils.js";

const registerSection = document.getElementById("register");
const registerForm = document.querySelector(".register-form");
registerForm.addEventListener("submit", onRegister);

let ctx = null;
export function showRegister(context) {
    ctx = context;
    ctx.render(registerSection);
}

async function onRegister(event) {
    event.preventDefault();

    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;
    const rePassword = document.getElementById("repeat-password").value;

    if (!email || !password || password !== rePassword) {
        return;
    }

    const userData = await register({ email, password });
    setUser(userData);
    ctx.updateNav();
    ctx.goTo("/home");
    registerForm.reset();
}