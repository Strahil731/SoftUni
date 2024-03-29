import { register } from "../services/userService.js";
import { setUser } from "../utils/userHelper.js";

const registerSection = document.getElementById("register");
const registerForm = document.querySelector(".register-form");
registerForm.addEventListener("submit", onRegister);

const convertToLogin = document.querySelector(".register-form p a");
convertToLogin.addEventListener("click", (event) => {
    event.preventDefault();
    ctx.goTo("/login");
});

let ctx = null;
export function showRegister(context) {
    ctx = context;
    ctx.render(registerSection, "");
}

async function onRegister(event) {
    event.preventDefault();

    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;
    const rePassword = document.getElementById("repeat-password").value;

    if (!email || !password || password !== rePassword) {
        return alert("Invalid input!");
    }

    const userData = await register({ email, password });
    setUser(userData);
    ctx.updateNav();
    ctx.goTo("/");
    registerForm.reset();
}